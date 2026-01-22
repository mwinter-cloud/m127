import io
from django.test import TestCase
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image


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
