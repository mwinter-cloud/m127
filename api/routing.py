from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/common-channel", consumers.CommonConsumer.as_asgi()),
    re_path(r"ws/poll/(?P<poll_id>\w+)$", consumers.PollConsumer.as_asgi()),
    re_path(r"ws/comments/(?P<poll_id>\w+)$", consumers.CommentsConsumer.as_asgi()),
    re_path(r"ws/room/(?P<room_id>\w+)$", consumers.RoomConsumer.as_asgi()),
    re_path(r"ws/user/(?P<user_id>\w+)$", consumers.UserConsumer.as_asgi()),
    re_path(r"ws/star-wars/", consumers.StarWarsConsumer.as_asgi()),
]