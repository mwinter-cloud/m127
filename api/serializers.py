from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Room, Tag, Poll, Option, Voice, Comment, Smile, Answer, Color, Notification, \
    Customization, Illustration, Report, Header_room, Carousel_room, Workplan, Update, RoomVoice, \
    ArticleIllustration, Article, Operation, StarWarsVoice
from django.shortcuts import get_object_or_404

# user + profile
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)

    def validate_email(self, value):
        exist_contact = User.objects.filter(email=value)
        if exist_contact:
            email = get_object_or_404(User, email=value)
            if email != '':
                raise serializers.ValidationError('Указанная почта уже используется')
        return value

    def validate_username(self, value):
        exist_contact = User.objects.filter(username=value)
        if exist_contact:
            username = get_object_or_404(User, username=value)
            if username != '':
                raise serializers.ValidationError('Указанный логин уже используется')
        return value

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'text', 'type', 'is_palette']

class ColorNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['type']

class ColorNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'type']

class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'is_staff']


class ProfileUpdateSerializer(serializers.ModelSerializer):
    user = UserAdminSerializer(many=False, read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'name', 'city', 'email', 'avatar', 'cover', 'post_text', 'post_image', 'post_title', 'post_created_at', 'webcite', 'color', 'is_admin', 'is_blocked', 'email_confirm', 'user']


class ProfileSerializer(serializers.ModelSerializer):
    color = ColorNameIdSerializer(many=False, read_only=True)
    user = UserAdminSerializer(many=False, read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'name', 'city', 'email', 'avatar', 'cover', 'post_text', 'post_image', 'post_title', 'post_created_at', 'webcite', 'color', 'is_admin', 'is_blocked', 'email_confirm', 'system_status', 'user']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'profile', 'is_staff']

class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class SmallProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name']

class MainProfileInfoSerializer(serializers.ModelSerializer):
    user = UserIdSerializer(many=False, read_only=True)
    color = ColorSerializer(many=False, read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'name', 'avatar', 'color', 'user']


class ModeratorProfileSerializer(serializers.ModelSerializer):
    user = UserAdminSerializer(many=False, read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'name', 'avatar', 'user']


#теги
class TagNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

# комнаты
class RoomListSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    answers_count = serializers.IntegerField(
        source='answers.count',
        read_only=True
    )
    last_answer = serializers.SerializerMethodField()
    def get_last_answer(self, instance):
        if instance.answers.exists():
            return AnswerSerializer(instance.answers.order_by('created_at').last()).data
        else:
            return 0
    class Meta:
        model = Room
        fields = ['id', 'name', 'author', 'answers_count', 'cover', 'last_answer']

class CreateRoomSerializer(serializers.ModelSerializer):
    tags = TagNameSerializer(many=True, read_only=True)
    class Meta:
        model = Room
        fields = ['id', 'name', 'author', 'created_at', 'message', 'views', 'tags', 'color', 'cover']

class RoomSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    tags = TagNameSerializer(many=True, read_only=True)
    color = ColorNameIdSerializer(many=False, read_only=True)
    class Meta:
        model = Room
        fields = ['id', 'name', 'author', 'created_at', 'message', 'views', 'tags', 'color', 'cover', 'type', 'saved_by']

class RoomVoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomVoice
        fields = ['grade']

class RoomNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name',]

class CarouselRoomSerializer(serializers.ModelSerializer):
    room = RoomNameIdSerializer(many=False)
    class Meta:
        model = Carousel_room
        fields = ['id', 'cover', 'room']

class HeaderRoomSerializer(serializers.ModelSerializer):
    room = RoomNameIdSerializer(many=False)
    class Meta:
        model = Header_room
        fields = ['id', 'cover', 'room']

class CarouselRoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel_room
        fields = ['id', 'cover', 'room']

class HeaderRoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header_room
        fields = ['id', 'cover', 'room']

class AnswerSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    class Meta:
        model = Answer
        fields = ['id', 'text', 'author', 'room', 'created_at', 'type', 'edited', 'edited_at']

class FullAnswerSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    room = RoomNameIdSerializer(many=False, read_only=True)
    class Meta:
        model = Answer
        fields = ['id', 'text', 'author', 'room', 'created_at', 'type']

class CreateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'author', 'room', 'created_at']

# опросы
class VoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voice
        fields = ['id', 'option']

class PollListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = ['id', 'question']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'poll']

class PollSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False, read_only=True)
    tags = TagNameSerializer(many=True, read_only=True)
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Poll
        fields = ['id', 'question', 'author', 'created_at', 'views', 'tags', 'options']

class CreateCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author', 'poll', 'created_at']

class CommentSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author', 'poll', 'created_at']

#уведомления
class NotificationSerializer(serializers.ModelSerializer):
    sender = MainProfileInfoSerializer(many=False, read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'text', 'type', 'created_at', 'object', 'sender']

class NotificationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'text', 'type', 'created_at', 'object', 'sender', 'recipients', 'viewed']

#жалобы
class ReportSerializer(serializers.ModelSerializer):
    sender = MainProfileInfoSerializer(many=False, read_only=True)
    violator = MainProfileInfoSerializer(many=False, read_only=True)
    class Meta:
        model = Report
        fields = ['id', 'type', 'violator', 'created_at', 'object', 'sender']

class ReportCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'type', 'created_at', 'object', 'sender', 'violator']

#кастомизация
class SmileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Smile
        fields = ['id', 'name', 'file']

class CustomizationSerializer(serializers.ModelSerializer):
        class Meta:
            model = Customization
            fields = ['id', 'type', 'text']

class IllustrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Illustration
        fields = ['id', 'type', 'text']

#admin-panel
class WorkplanCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workplan
        fields = ['id', 'type', 'name', 'author', 'rating', 'start', 'end', 'description']
class WorkplanSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    class Meta:
        model = Workplan
        fields = ['id', 'type', 'name', 'author', 'rating', 'start', 'end', 'description']

class UpdateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Update
        fields = ['id', 'type', 'name', 'author', 'rating', 'created_at', 'description']
class UpdateSerializer(serializers.ModelSerializer):
    author = MainProfileInfoSerializer(many=False)
    class Meta:
        model = Update
        fields = ['id', 'type', 'name', 'author', 'rating', 'created_at', 'description']

#гайды
class ArticleSerializer(serializers.ModelSerializer):
    updated_by = SmallProfileInfoSerializer(many=False)
    class Meta:
        model = Article
        fields = ['id', 'name', 'text', 'updated_at', 'updated_by', 'illustrations']

class ArticleIllustrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleIllustration
        fields = ['id', 'description', 'file', 'article']

class OperationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = ['id', 'code']
        
#star-wars
class StarWarsVoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StarWarsVoice
        fields = ['id', 'side', 'voices']