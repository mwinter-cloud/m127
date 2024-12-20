from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class CommonConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'common-room'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        author = text_data_json['author']
        style = text_data_json['style']
        text = text_data_json['text']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'megafon',
                'author': author,
                'style': style,
                'text': text,
            }
        )

    def megafon(self, event):
        author = event['author']
        style = event['style']
        text = event['text']

        self.send(text_data=json.dumps({
            'author': author,
            'style': style,
            'text': text,
        }))

class PollConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = str(self.scope['url_route']['kwargs']['poll_id'])
        self.room_group_name = 'poll' + self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        option = text_data_json['option']
        operation = text_data_json['operation']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'voice',
                'option': option,
                'operation': operation,
            }
        )

    def voice(self, event):
        option = event['option']
        operation = event['operation']

        self.send(text_data=json.dumps({
            'option': option,
            'operation': operation,
        }))


class CommentsConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = str(self.scope['url_route']['kwargs']['poll_id'])
        self.room_group_name = 'poll_comments' + self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        text = text_data_json['text']
        created_at = text_data_json['created_at']
        name = text_data_json['name']
        avatar = text_data_json['avatar']
        id = text_data_json['id']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'comment',
                'text': text,
                'created_at': created_at,
                'name': name,
                'avatar': avatar,
                'id': id,
            }
        )

    def comment(self, event):
        poll = self.room_name
        created_at = event['created_at']
        text = event['text']
        name = event['name']
        avatar = event['avatar']
        id = event['id']

        self.send(text_data=json.dumps({
            'poll': poll,
            'created_at': created_at,
            'text': text,
            'name': name,
            'avatar': avatar,
            'id': id,
        }))


class RoomConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = str(self.scope['url_route']['kwargs']['room_id'])
        self.room_group_name = 'room' + self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        type = text_data_json['type']
        text = text_data_json['text']
        created_at = text_data_json['created_at']
        id = text_data_json['id']
        author = text_data_json['author']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': type,
                'text': text,
                'created_at': created_at,
                'author': author,
                'id': id,
            }
        )

    def new_answer(self, event):
        text = event['text']
        created_at = event['created_at']
        id = event['id']
        author = event['author']

        self.send(text_data=json.dumps({
            'text': text,
            'created_at': created_at,
            'author': author,
            'id': id,
        }))


class UserConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = str(self.scope['url_route']['kwargs']['user_id'])
        self.room_group_name = 'user' + self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        type = 'notification'
        id = text_data_json['id']
        notif_type = text_data_json['notif_type']
        object = text_data_json['object']
        text = text_data_json['text']
        created_at = text_data_json['created_at']
        sender = text_data_json['sender']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'id': id,
                'type': type,
                'notif_type': notif_type,
                'object': object,
                'text': text,
                'created_at': created_at,
                'sender': sender,
            }
        )

    def notification(self, event):
        id = event['id']
        notif_type = event['notif_type']
        object = event['object']
        text = event['text']
        created_at = event['created_at']
        sender = event['sender']

        self.send(text_data=json.dumps({
            'id': id,
            'notif_type': notif_type,
            'object': object,
            'text': text,
            'created_at': created_at,
            'sender': sender,
        }))

class StarWarsConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'star-wars'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        author = text_data_json['author']
        style = text_data_json['style']
        text = text_data_json['text']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'megafon',
                'author': author,
                'style': style,
                'text': text,
            }
        )

    def megafon(self, event):
        author = event['author']
        style = event['style']
        text = event['text']

        self.send(text_data=json.dumps({
            'author': author,
            'style': style,
            'text': text,
        }))