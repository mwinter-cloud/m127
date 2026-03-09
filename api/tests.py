import asyncio
import io

from channels.routing import URLRouter
from channels.testing import WebsocketCommunicator
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, TransactionTestCase, override_settings
from django.urls import re_path
from PIL import Image

from api.consumers import ChatConsumer
from api.models import Chat, Color, Message, Profile


class AnswerImageUploadTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="u1", password="p1")

    def _make_png_file(self, name="t.png", size=(10, 10), color=(255, 0, 0, 255)):
        buf = io.BytesIO()
        img = Image.new("RGBA", size, color)
        img.save(buf, format="PNG")
        buf.seek(0)
        return SimpleUploadedFile(name, buf.read(), content_type="image/png")

    def test_requires_auth(self):
        img = self._make_png_file()
        res = self.client.post("/api/upload-answer-image", data={"image": img})
        self.assertEqual(res.status_code, 403)

    def test_upload_success_returns_url(self):
        self.client.login(username="u1", password="p1")
        img = self._make_png_file()
        res = self.client.post("/api/upload-answer-image", data={"image": img})
        self.assertEqual(res.status_code, 200)
        self.assertIn("url", res.json())
        self.assertTrue(res.json()["url"].startswith("/media/"))

    def test_rejects_non_image(self):
        self.client.login(username="u1", password="p1")
        fake = SimpleUploadedFile("x.txt", b"not an image", content_type="text/plain")
        res = self.client.post("/api/upload-answer-image", data={"image": fake})
        self.assertEqual(res.status_code, 400)


@override_settings(
    CHANNEL_LAYERS={
        "default": {"BACKEND": "channels.layers.InMemoryChannelLayer"},
    },
)
class ChatConsumerTests(TransactionTestCase):
    def setUp(self):
        self.color = Color.objects.create(type=Color.SITE_COLOR, text="default")
        self.user1 = User.objects.create_user(username="chat-user-1", password="p1")
        self.user2 = User.objects.create_user(username="chat-user-2", password="p2")
        self.user3 = User.objects.create_user(username="chat-user-3", password="p3")
        self.profile1 = Profile.objects.create(user=self.user1, name="profile1", color=self.color)
        self.profile2 = Profile.objects.create(user=self.user2, name="profile2", color=self.color)
        self.profile3 = Profile.objects.create(user=self.user3, name="profile3", color=self.color)
        self.chat = Chat.objects.create()
        self.chat.participants.set([self.profile1, self.profile2])
        self.application = URLRouter([
            re_path(r"ws/chat/(?P<chat_id>\w+)$", ChatConsumer.as_asgi()),
        ])

    def _run_async(self, coro):
        return asyncio.get_event_loop().run_until_complete(coro)

    def test_participant_can_send_and_receive_messages(self):
        async def scenario():
            communicator = WebsocketCommunicator(self.application, f"/ws/chat/{self.chat.id}")
            communicator.scope["user"] = self.user1
            connected, _ = await communicator.connect()
            self.assertTrue(connected)
            await communicator.send_json_to({"content": "hello"})
            response = await communicator.receive_json_from()
            self.assertEqual(response["type"], "chat_message")
            self.assertEqual(response["message"]["text"], "hello")
            self.assertEqual(response["message"]["author"], self.profile1.name)
            self.assertEqual(Message.objects.filter(chat=self.chat).count(), 1)
            await communicator.disconnect()
        self._run_async(scenario())

    def test_non_participant_is_rejected(self):
        async def scenario():
            communicator = WebsocketCommunicator(self.application, f"/ws/chat/{self.chat.id}")
            communicator.scope["user"] = self.user3
            connected, _ = await communicator.connect()
            self.assertFalse(connected)
            await communicator.wait_closed()
        self._run_async(scenario())
