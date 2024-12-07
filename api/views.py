from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .serializers import UserRegistrationSerializer, UserSerializer, ProfileSerializer, ProfileUpdateSerializer,\
    RoomListSerializer, \
    TagNameSerializer, PollListSerializer, PollSerializer, VoiceSerializer, CommentSerializer, \
    CreateCommentSerializer, SmileSerializer, RoomSerializer, AnswerSerializer, ColorSerializer, \
    CreateAnswerSerializer, NotificationSerializer, NotificationCreateSerializer, CustomizationSerializer, \
    IllustrationSerializer, CreateRoomSerializer, OptionSerializer, ReportSerializer, ReportCreateSerializer, \
    FullAnswerSerializer, CarouselRoomSerializer, HeaderRoomSerializer, HeaderRoomCreateSerializer, \
    CarouselRoomCreateSerializer, WorkplanSerializer, WorkplanCreateSerializer, ModeratorProfileSerializer, \
    UpdateSerializer, UpdateCreateSerializer, RoomVoiceSerializer, ArticleSerializer, \
    ArticleIllustrationSerializer, OperationCodeSerializer
from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Profile, Room, Carousel_room, Header_room, Tag, Poll, Voice, Option, Comment, Smile, Answer, \
    Color, Notification, Customization, Illustration, Report, Workplan, Update, RoomVoice, Article, \
    ArticleIllustration, Operation
from django.shortcuts import get_object_or_404, redirect
from django.db.models import Q
from django.db.models import Count
from random import randint
from django.template.loader import render_to_string
from django.core.mail import send_mail

class UserView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        serializer = UserRegistrationSerializer(data=data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        user = serializer.save()
        Profile(name=user.username, user=user, color=None).save()
        login(request, user)
        return JsonResponse(True, safe=False)

    def send_confirm_email(self, request):
        user = request.user
        oper_code = randint(0, 1000000)
        email = user.email
        operation = Operation(code=oper_code, user=user, type=1, info=email)
        operation.save()
        origin = 'lisphere.space'
        data = {'code': oper_code, 'email': email, 'origin': origin}
        msg_plain = render_to_string('emails/email_confirm.txt', data)
        msg_html = render_to_string('emails/email_confirm.html', data)
        subject, from_email, to = 'Регистрация на сайте ' + origin, 'hello@lisphere.space', [email]
        send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
        return JsonResponse(True, safe=False)

    def retrieve(self, request):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=request.user.pk)
        if not hasattr(user, 'profile'):
            Profile(name=user.username, user=user, color=None).save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def login(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
        else:
            return JsonResponse(status=400, data={"error": "Запись не найдена"})
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data, safe=False)

    def logout(self, request):
        logout(request)
        return redirect('../login/')

    def register_confirm(self, request):
        queryset = Operation.objects.all()
        code = request.POST.get('code')
        exist_operation = queryset.filter(code=code)
        if exist_operation:
            operation = get_object_or_404(queryset, code=code)
            profile = get_object_or_404(Profile.objects.all(), user=operation.user)
            profile.email_confirm = True
            profile.save()
            operation.delete()
            return JsonResponse('success', safe=False)
        return JsonResponse('fail', safe=False)

    def send_change_email_mail(self, request):
        new_email = request.POST.get('email')
        user = request.user
        email = user.email
        exist_operation = Operation.objects.all().filter(info=new_email, type=3, user=user)
        if not exist_operation:
            oper_code = randint(0, 1000000)
            operation = Operation(code=oper_code, user=user, type=3, info=new_email)
            operation.save()
        else:
            operation = get_object_or_404(Operation.objects.all(), info=new_email, type=3, user=user)
            oper_code = operation.code
        origin = request.POST.get('origin')
        data = {'code': oper_code, 'old_email': email, 'new_email': new_email, 'origin': origin}
        msg_plain = render_to_string('emails/email_change.txt', data)
        msg_html = render_to_string('emails/email_change.html', data)
        subject, from_email, to = f'Смена почты на сайте {origin}', 'hello@lisphere.space', [email]
        send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
        return JsonResponse(True, safe=False)

    def change_email(self, request, code):
        queryset = Operation.objects.all()
        exist_operation = queryset.filter(code=code)
        if exist_operation:
            operation = get_object_or_404(queryset, code=code)
            user = request.user
            user.email = operation.info
            user.save()
            operation.delete()
        return redirect("../../")

    def change_password_email(self, request):
        user = request.user
        email = user.email
        exist_operation = Operation.objects.all().filter(type=2, user=user)
        if not exist_operation:
            oper_code = randint(0, 1000000)
            operation = Operation(code=oper_code, user=user, type=2, info=email)
            operation.save()
        else:
            operation = get_object_or_404(Operation.objects.all(), type=2, user=user)
            oper_code = operation.code
        origin = request.POST.get('origin')
        data = {'code': oper_code, 'origin': origin}
        msg_plain = render_to_string('emails/password_change.txt', data)
        msg_html = render_to_string('emails/password_change.html', data)
        subject, from_email, to = f'Смена пароля на сайте {origin}', 'hello@lisphere.space', [email]
        send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
        return JsonResponse(True, safe=False)

    def change_anonim_password_email(self, request):
        email = request.POST.get('email')
        user = get_object_or_404(User.objects.all(), email=email)
        exist_operation = Operation.objects.all().filter(type=2, user=user, info=email)
        if not exist_operation:
            oper_code = randint(0, 1000000)
            operation = Operation(code=oper_code, user=user, type=2, info=email)
            operation.save()
        else:
            operation = get_object_or_404(Operation.objects.all(), type=2, user=user, info=email)
            oper_code = operation.code
        origin = request.POST.get('origin')
        data = {'code': oper_code, 'origin': origin}
        msg_plain = render_to_string('emails/password_change.txt', data)
        msg_html = render_to_string('emails/password_change.html', data)
        subject, from_email, to = f'Смена пароля на сайте {origin}', 'hello@lisphere.space', [email]
        send_mail(subject, msg_plain, from_email, to, html_message=msg_html)
        return JsonResponse(True, safe=False)


class ProfileView(viewsets.ViewSet):
    def create_base(self, request):
        user = request.user
        Profile(name=user.username, user=user, color=None).save()
        return Response(True)

    def create(self, request):
        queryset = Profile.objects.all()
        data = request.data
        _mutable = data._mutable
        data._mutable = True
        data['email_confirm'] = True
        data._mutable = _mutable
        profile = get_object_or_404(queryset, pk=request.user.profile.pk)
        serializer = ProfileSerializer(profile, data=data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        serializer.save()
        # выполним подписку на комнату с объявлениями
        room = get_object_or_404(Room.objects, pk=35)  # эта комната имеет id 35, при смене изменить
        room.saved_by.add(profile)
        room.save()
        return Response(serializer.data)

    def retrieve(self, request, pk):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def block(self, request):
        profile_id = int(request.POST.get('profile_id'))
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=profile_id)
        profile.is_blocked = True
        profile.save()
        return Response(True)

    def update(self, request):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=request.user.profile.pk)
        data = request.data
        _mutable = data._mutable
        data._mutable = True
        data['email_confirm'] = True
        data['is_admin'] = request.user.profile.is_admin
        data._mutable = _mutable
        serializer = ProfileUpdateSerializer(profile, data=data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        if data.get("clear_avatar"):
            profile.avatar.delete(save=True)
        if data.get("clear_cover"):
            profile.cover.delete(save=True)
        if data.get("clear_post_image"):
            profile.post_image.delete(save=True)
        serializer.save()
        return JsonResponse(serializer.data, safe=False)

    def retrieve_my_profile(self, request):
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=request.user.profile.pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def blocked_list(self, request):
        profile_list = Profile.objects.all().filter(Q(is_blocked=True))
        serializer = ProfileSerializer(profile_list, many=True)
        return Response(serializer.data)

    def restore(self, request):
        profile_id = int(request.POST.get('profile_id'))
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=profile_id)
        profile.is_blocked = False
        profile.save()
        return Response(True)

    def moderator_list(self, request):
        queryset = Profile.objects.all()
        list = queryset.filter(is_admin=True)
        serializer = ModeratorProfileSerializer(list, many=True)
        return JsonResponse(serializer.data, safe=False)

    def moderator_delete(self, request):
        queryset = Profile.objects.all()
        id = request.data.get('id')
        profile = get_object_or_404(queryset, pk=id)
        profile.is_admin = False
        profile.save()
        return Response(True)

    def get_invite_code(self, request):
        queryset = Operation.objects
        user = request.user
        invite = queryset.filter(user=user, type=4)
        if invite.exists():
            try:
                operation = get_object_or_404(queryset, user=user, type=4)
            except:
                operation = queryset.filter(user=user, type=4).order_by('id').first()
            serializer = OperationCodeSerializer(operation, many=False)
            code = serializer.data.get('code')
        else:
            code = request.POST.get('code')
            Operation(user=user, type=4, code=code).save()
        return JsonResponse(code, safe=False)

    def compare_invite_code(self, request):
        queryset = Operation.objects.all()
        code = request.POST.get('code')
        operation = queryset.filter(code=code, type=4)
        if operation.exists():
            operation = get_object_or_404(queryset, code=code, type=4)
            serializer = OperationCodeSerializer(operation, many=False)
            result = serializer.data.get('id')
        else:
            result = False
        return JsonResponse(result, safe=False)

    def add_moderator(self, request):
        queryset = Profile.objects.all()
        id = request.data.get('id')
        profile = get_object_or_404(queryset, pk=id)
        if profile.is_admin == True:
            result = 2
        else:
            profile.is_admin = True
            profile.save()
            result = 1
        serializer = ProfileSerializer(profile)
        return JsonResponse({"profile": serializer.data, "result": result}, safe=False)


class RoomView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        user = request.user.profile
        serializer = CreateRoomSerializer(data=data)
        tags = request.POST.getlist('tags[]')
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        new_room = serializer.save(author=user, tags=tags)
        return JsonResponse({"data": serializer.data, 'room_id': new_room.id}, safe=False)

    def edit(self, request):
        queryset = Room.objects.all()
        room_id = request.POST.get('room_id')
        tags = request.POST.getlist('tags[]')
        room = get_object_or_404(queryset, pk=room_id)
        serializer = CreateRoomSerializer(room, data=request.data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        if request.POST.get("clear_cover"):
            room.cover.delete(save=True)
        room = serializer.save(tags=tags)
        show_serializer = RoomSerializer(room)
        return JsonResponse({"room": show_serializer.data}, safe=False)

    def retrieve(self, request, id):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=id)
        serializer = RoomSerializer(room)
        return Response(serializer.data)

    def list(self, request):
        tags = request.POST.getlist('tags[]')
        search_str = request.POST.get('search_str')
        section = request.POST.get('section')
        loaded_rooms_count = int(request.POST.get('loaded_rooms_count'))
        user_id = request.user.id
        profile_id = request.user.profile.id
        # системные записи отмечены типом "служебные" и "административные". их не отображаем в общем списке
        room_list = Room.objects.all().exclude(type="ADM").exclude(type="OFC")
        if section == "my":
            room_list = room_list.filter(author__pk=(profile_id)).distinct()
        if section == "popular":
            room_list = room_list.order_by('-views')
        if search_str != '':
            room_list = room_list.filter(Q(name__icontains=search_str)).distinct()
        if tags != []:
            room_list = room_list.filter(tags__in=(tags)).distinct()
        if section == "new":
            room_list = room_list.order_by('-created_at')
        if section == "saves":
            room_list = room_list.filter(saved_by=(user_id)).distinct()
        start = loaded_rooms_count
        end = loaded_rooms_count+10
        control_room = 1
        try:
            control_item = room_list[end]
        except IndexError:
            control_room = 0
        room_list = room_list[start:end]
        serializer = RoomListSerializer(room_list, many=True)
        return Response({'rooms': serializer.data, 'control_room': control_room})

    def new_rooms(self, request):
        room_list = Room.objects.all().exclude(type="ADM").exclude(type="OFC").order_by('-created_at')[:7]
        serializer = RoomListSerializer(room_list, many=True)
        return Response({'rooms': serializer.data})
        
    def delete(self, request):
        queryset = Room.objects.all()
        room_id = int(request.POST.get('room_id'))
        answer = get_object_or_404(queryset, pk=room_id)
        answer.cover.delete(save=True)
        answer.delete()
        return Response(True)

    def is_saved(self, request, pk):
        user = request.user
        poll = Room.objects.all().filter(id=pk).filter(saved_by__id__icontains=user.id)
        if poll.exists():
            status = 1
        else:
            status = 0
        return JsonResponse(status, safe=False)

    def save(self, request):
        room_id = int(request.POST.get('room_id'))
        saved_status = int(request.POST.get('saved_status'))
        user = request.user
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=room_id)
        if saved_status == 0:
            room.saved_by.add(user)
            room.save()
            status = 1
        else:
            room.saved_by.remove(user)
            room.save()
            status = 0
        return JsonResponse(status, safe=False)

    def save_main_room(self, request):
        data = request.data
        type = int(request.POST.get('type'))
        room_id = int(request.POST.get('room_id'))
        _mutable = data._mutable
        data._mutable = True
        data['room'] = room_id
        data._mutable = _mutable
        if type == 1:
            carousel_rooms = Carousel_room.objects.all()
            # проверим, вдруг эта комната уже добавлена
            if (carousel_rooms.filter(room__id=room_id).exists()):
                room = get_object_or_404(carousel_rooms, room__id=room_id)
                serializer = CarouselRoomCreateSerializer(room, data=data)
                if not serializer.is_valid():
                    return JsonResponse(status=400, data=serializer.errors)
                serializer.save()
                return JsonResponse(serializer.data, safe=False)

            if carousel_rooms.count() >= 3:
                carousel_rooms[0].cover.delete(save=True)
                carousel_rooms[0].delete()
            serializer = CarouselRoomCreateSerializer(data=data)
            if not serializer.is_valid():
                return JsonResponse(status=400, data=serializer.errors)
            serializer.save()
            return JsonResponse({"data": serializer.data}, safe=False)
        if type == 2:
            header_rooms = Header_room.objects.all()
            # проверим, вдруг эта комната уже добавлена
            if (header_rooms.filter(room__id=room_id).exists()):
                try:
                    room = get_object_or_404(header_rooms, room__id=room_id)
                except:
                    room = header_rooms.filter(room__id=room_id).order_by('id').first()
                serializer = HeaderRoomCreateSerializer(room, data=data)
                if not serializer.is_valid():
                    return JsonResponse(status=400, data=serializer.errors)
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            if header_rooms.count() >= 5:
                header_rooms[0].cover.delete(save=True)
                header_rooms[0].delete()
            serializer = HeaderRoomCreateSerializer(data=data)
            if not serializer.is_valid():
                return JsonResponse(status=400, data=serializer.errors)
            serializer.save()
            return JsonResponse({"data": serializer.data}, safe=False)
        return JsonResponse(status=400, data='Error :(')

    def carousel_room_list(self, request):
        rooms = Carousel_room.objects.all().order_by("-id")
        serializer = CarouselRoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def header_room_list(self, request, count):
        rooms = Header_room.objects.all().order_by("-id")[:count]
        serializer = HeaderRoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def oficial_list(self, request):
        rooms = Room.objects.all().filter(Q(type="OFC") | Q(type="ADM")).order_by("-id").distinct()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def set_view(self, request, id):
        queryset = Room.objects.all()
        room = get_object_or_404(queryset, pk=id)
        room.views = room.views + 1
        room.save()
        return Response(True)


class RoomVoiceView(viewsets.ViewSet):
    def get_data(self, request, room_id):
        user = request.user
        voices = RoomVoice.objects.filter(room_id=room_id)
        serializer = RoomVoiceSerializer(voices, many=True)
        my_voice = voices.filter(author=user)
        if my_voice.exists():
            is_my_voice = 1
        else:
            is_my_voice = 0
        return JsonResponse({"voice_list": serializer.data, 'is_my_voice': is_my_voice}, safe=False)

    def add(self, request):
        data = request.data
        room_id = int(request.data.get('room'))
        room = get_object_or_404(Carousel_room.objects, pk=room_id)
        RoomVoice(room=room, author=request.user, grade=data.get('grade')).save()
        voices = RoomVoice.objects.all().filter(room_id=room_id)
        serializer = RoomVoiceSerializer(voices, many=True)
        return JsonResponse({"voice_list": serializer.data, 'is_my_voice': 1}, safe=False)


class TagView(viewsets.ViewSet):
    def list(self, request):
        search_str = request.POST.get('search_str')
        tag_list = Tag.objects.all().filter(Q(name__icontains=search_str)).distinct()[:10]
        serializer = TagNameSerializer(tag_list, many=True)
        return Response(serializer.data)

    def popular_tag_list(self, request):
        queryset = Tag.objects.all().exclude(id=3).annotate(cnt=Count('room')).order_by('-cnt').distinct()
        serializer = TagNameSerializer(queryset, many=True)
        return Response(serializer.data)


class PollView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        serializer = PollSerializer(data=data)
        tags = request.POST.getlist('tags[]')
        user = request.user.profile
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        poll = serializer.save(author=user, tags=tags)
        return JsonResponse({"poll_id": poll.id}, safe=False)

    def list(self, request):
        tags = request.POST.getlist('tags[]')
        search_str = request.POST.get('search_str')
        section = request.POST.get('section')
        loaded_polls_count = int(request.POST.get('loaded_polls_count'))
        user_id = request.user.id
        # системные записи не отображаем в общем списке
        poll_list = Poll.objects.all().exclude(type="ADM").exclude(type="OFC")
        if section == "popular":
            poll_list = poll_list.order_by('-views')
        if search_str != '':
            poll_list = poll_list.filter(Q(question__icontains=search_str)).distinct()
        if tags != []:
            poll_list = poll_list.filter(tags__in=(tags)).distinct()
        if section == "new":
            poll_list = poll_list.order_by('-created_at')
        if section == "saves":
            poll_list = poll_list.filter(saved_by=(user_id)).distinct()
        end = loaded_polls_count + 10
        control_poll = 1
        try:
            control_item = poll_list[end]
        except IndexError:
            control_poll = 0
        poll_list = poll_list[loaded_polls_count:end]
        serializer = PollListSerializer(poll_list, many=True)
        return Response({'polls': serializer.data, 'control_poll': control_poll})

    def retrieve(self, request, pk=None):
        queryset = Poll.objects.all()
        poll = get_object_or_404(queryset, pk=pk)
        serializer = PollSerializer(poll)
        return Response(serializer.data)

    def is_poll_saved(self, request, pk):
        user = request.user
        poll = Poll.objects.all().filter(id=pk).filter(saved_by__id__icontains=user.id)
        if poll.exists():
            status = 'saved'
        else:
            status = 'unsaved'
        return JsonResponse(status, safe=False)

    def save_poll(self, request, pk):
        saved_status = request.POST.get('saved_status')
        user = request.user
        queryset = Poll.objects.all()
        poll = get_object_or_404(queryset, pk=pk)
        if saved_status == 'unsaved':
            poll.saved_by.add(user)
            poll.save()
            status = 'saved'
        else:
            poll.saved_by.remove(user)
            poll.save()
            status = 'unsaved'
        return JsonResponse(status, safe=False)

    def get_voice(self, request, pk):
        voice = Voice.objects.filter(option__poll__pk=pk, author=request.user)
        if voice.exists():
            serializer = VoiceSerializer(voice[0], many=False)
            return JsonResponse(serializer.data, safe=False)
        else:
            return Response(0)

    def delete(self, request):
        poll_id = request.data.get('poll_id')
        queryset = Poll.objects.all()
        poll = get_object_or_404(queryset, pk=poll_id)
        poll.delete()
        return Response("Опрос удален.")

    def set_view(self, request, id):
        queryset = Poll.objects.all()
        poll = get_object_or_404(queryset, pk=id)
        poll.views = poll.views + 1
        poll.save()
        return Response(True)


class OptionView(viewsets.ViewSet):
    def create(self, request):
        text = request.POST.get('text')
        poll_id = request.POST.get('poll_id')
        option_data = {
            'text': text,
            'poll': int(poll_id)
        }
        serializer = OptionSerializer(data=option_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse({"option": serializer.data}, safe=False)
        return JsonResponse(status=400, data=serializer.errors)


class VoiceView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        user = request.user
        option = int(request.POST.get('option'))
        operation = request.POST.get('operation')
        serializer = VoiceSerializer(data=data)
        voice = Voice.objects.all().filter(option=option, author=user)
        if voice.exists():
            if operation == "delete":
                voice.delete()
                return JsonResponse(data, safe=False)
            else:
                return Response(0)
        else:
            if operation == "add":
                if serializer.is_valid(raise_exception=True):
                    serializer.save(author=user)
                    return JsonResponse(data, safe=False)
                else:
                    return Response('При отправке голоса произошла ошибка. Попробуйте позже :)')
        return Response(data)

    def get_voices(self, request, poll_id):
        options = Option.objects.filter(poll__pk=poll_id)
        voices_list = []
        for opt in options:
            voices = Voice.objects.all().filter(option=opt.id)
            count = len(voices)
            voices_list.append(count)
        return Response(voices_list)


class CommentView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        user = request.user
        text = data.get('text')
        poll_id = data.get('poll_id')
        option_data = {
            'text': text,
            'poll': poll_id,
            'author': user.profile.pk
        }
        serializer = CreateCommentSerializer(data=option_data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        serializer.save()
        comment = Comment.objects.get(pk=serializer.data.get('id'))
        show_serializer = CommentSerializer(comment)
        return Response(show_serializer.data)

    def retrieve(self, request, poll_id):
        comments = Comment.objects.filter(poll__pk=poll_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def delete(self, request):
        comment_id = request.data.get('comment_id')
        queryset = Comment.objects.all()
        comment = get_object_or_404(queryset, pk=comment_id)
        comment.delete()
        return Response("Комментарий удален.")


class SmileView(viewsets.ViewSet):
    def create(self, request):
        data = request.data
        serializer = SmileSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return JsonResponse(serializer.data, safe=False)

    def delete(self, request):
        id = request.data.get('id')
        queryset = Smile.objects.all()
        smile = get_object_or_404(queryset, pk=id)
        smile.file.delete(save=True)
        smile.delete()
        return Response(True)

    def list(self, request):
        smiles = Smile.objects.all()
        serializer = SmileSerializer(smiles, many=True)
        return Response(serializer.data)


class ColorView(viewsets.ViewSet):
    def list(self, request):
        # получим палетку
        colors = Color.objects.all()
        serializer = ColorSerializer(colors, many=True)
        return Response(serializer.data)


class IllustrationView(viewsets.ViewSet):
    def list(self, request):
        illustrations = Illustration.objects.all()
        serializer = IllustrationSerializer(illustrations, many=True)
        return Response(serializer.data)

    def edit(self, request):
        fields = ['L', 'IN', 'DA', 'DC', 'EP', 'AP', 'GC', 'RP', 'LP']
        for field in fields:
            new_value = request.POST.get(field)
            try:
                note = Illustration.objects.all().get(type=field)
                old_value = note.text
                if old_value != new_value:
                    Update(name="Изменено значения для иллюстрации " + note.type, author=request.user.profile,
                           description='Значение изменилось с "' + old_value + '" на "' + new_value + '"').save()
                note.text = new_value
                note.save()
            except:
                pass
            colors = Illustration.objects.all()
            serializer = ColorSerializer(colors, many=True)
        return JsonResponse({"result": 1, "illustrations": serializer.data}, safe=False)


class CustomizationView(viewsets.ViewSet):
    def list(self, request):
        settings = Customization.objects.all()
        serializer = CustomizationSerializer(settings, many=True)
        return Response(serializer.data)

    def announcement(self, request):
        try:
            note = Customization.objects.all().get(type="AN")
        except:
            return Response("")
        serializer = CustomizationSerializer(note, many=False)
        return Response(serializer.data)

    def citename(self, request):
        try:
            note = Customization.objects.all().get(type="CN")
        except:
            return Response("")
        serializer = CustomizationSerializer(note, many=False)
        return Response(serializer.data)

    def site_data(self, request):
        notes = Customization.objects.all().filter(type__in=["RL", "SD", "CT"])
        notes_serializer = CustomizationSerializer(notes, many=True)
        logo = Illustration.objects.all().filter(type__in=["L"]).latest('pk').text
        data = {"info": notes_serializer.data, "logo": logo}
        return Response(data)

    def edit(self, request):
        customization_fields = ['AN', 'RL', 'SD', 'CT']
        color_fields = ['SC', 'AB', 'EMC', 'MC', 'DAC', 'EC', 'SO', 'VB',
                        'violet', 'red', 'yellow', 'd_blue', 'blue', 'pink', 'green', 'orange', 'cherry', 'gray']
        for field in customization_fields:
            new_value = request.POST.get(field)
            try:
                note = Customization.objects.all().get(type=field)
                old_value = note.text
                if old_value != new_value:
                    Update(name="Изменен текст объявления", author=request.user.profile,
                           description='Значение изменилось с "' + old_value + '" на "' + new_value + '"').save()
                note.text = new_value
                note.save()
            except:
                pass
        for field in color_fields:
            new_value = request.POST.get(field)
            try:
                note = Color.objects.all().get(type=field)
                old_value = note.text
                if old_value != new_value:
                    Update(name="Изменено значения для цвета " + note.type, author=request.user.profile,
                           description='Значение изменилось с "' + old_value + '" на "' + new_value + '"').save()
                note.text = new_value
                note.save()
            except:
                pass
            colors = Color.objects.all()
            serializer = ColorSerializer(colors, many=True)
        return JsonResponse({"result": 1, "colors": serializer.data}, safe=False)


class AnswerView(viewsets.ViewSet):
    def retrieve(self, request, id):
        queryset = Answer.objects.all()
        answer = get_object_or_404(queryset, pk=id)
        serializer = FullAnswerSerializer(answer, many=False)
        return JsonResponse(serializer.data, safe=False)

    def list(self, request):
        loaded_answers_count = int(request.POST.get('loaded_answers_count'))
        section = int(request.POST.get('section'))
        id = int(request.POST.get('id'))
        if section == 2:
            answer_list = Answer.objects.all().filter(room__pk=id).order_by('-created_at')
        if section == 1:
            answer_list = Answer.objects.all().filter(room__pk=id)
        start = loaded_answers_count
        end = loaded_answers_count+10
        control_answer = 1
        try:
            control_item = answer_list[end]
        except IndexError:
            control_answer = 0
        answer_list = answer_list[start:end]
        serializer = AnswerSerializer(answer_list, many=True)
        return Response({'answers': serializer.data, 'control_answer': control_answer})

    def create(self, request):
        data = request.data
        user = request.user.profile.pk
        text = data.get('text')
        id = data.get('id')
        option_data = {
            'text': text,
            'room': id,
            'author': user
        }
        serializer = CreateAnswerSerializer(data=option_data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        serializer.save()
        answer = Answer.objects.get(pk=serializer.data.get('id'))
        show_serializer = AnswerSerializer(answer)
        return Response(show_serializer.data)

    def edit(self, request):
        data = request.data
        user = request.user.profile.pk
        text = data.get('text')
        answer_id = data.get('id')
        queryset = Answer.objects.all()
        answer = get_object_or_404(queryset, pk=answer_id)
        serializer = CreateAnswerSerializer(answer, data=data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        answer = serializer.save()
        show_serializer = AnswerSerializer(answer)
        return JsonResponse(show_serializer.data, safe=False)

    def delete(self, request):
        answer_id = request.data.get('answer_id')
        queryset = Answer.objects.all()
        answer = get_object_or_404(queryset, pk=answer_id)
        answer.delete()
        return Response(True)

    def hide_answer(self, request):
        answer_id = request.data.get('answer_id')
        queryset = Answer.objects.all()
        answer = get_object_or_404(queryset, pk=answer_id)
        answer.type = 2
        answer.save()
        return Response(True)

    def restore_answer(self, request):
        answer_id = request.data.get('answer_id')
        queryset = Answer.objects.all()
        answer = get_object_or_404(queryset, pk=answer_id)
        answer.type = 1
        answer.save()
        return Response(True)


# уведомления
class NotificationView(viewsets.ViewSet):
    def list(self, request):
        user = request.user
        queryset = Notification.objects.all().filter(recipients=user).order_by('-id')[:10]
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        user = request.user
        type = int(data.get('type'))
        if (type == 3):
            recipients_list = Profile.objects.all().filter(is_admin=1)
            recipients = []
            viewed = ""
            text = ""
            object = 0
            for rec in recipients_list:
                recipients.append(rec.user.id)
                viewed += str(rec.id) + ','
        else:
            recipients = data.getlist('recipients[]')
            viewed = ','.join(recipients)
            text = data.get('text')
            object = data.get('object')
        option_data = {
            'text': text,
            'object': object,
            'type': type,
            'recipients': recipients,
            'sender': user.profile.id,
            'viewed': viewed,
        }
        serializer = NotificationCreateSerializer(data=option_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return JsonResponse(serializer.data, safe=False)

    def get_new(self, request):
        user = request.user
        queryset = Notification.objects.all().filter(recipients__in=([user.id]), viewed__icontains=(user.id))
        if queryset.exists():
            res = 1
        else:
            res = 0
        return Response(res)

    def show_new_notifs(self, request):
        user = request.user
        queryset = Notification.objects.all().filter(viewed__icontains=(user.id))
        if queryset.exists():
            for notif in queryset:
                viewed = str(notif.viewed)
                viewed = viewed.replace(str(user.id), "")
                notif.viewed = viewed
                notif.save()
        else:
            return Response(0)
        return Response(user.id)

    def warning_exist(self, request):
        data = request.data
        violator_id = int(data.get('violator_id'))
        object_id = int(data.get('object_id'))
        type = int(data.get('type'))
        queryset = Notification.objects.all().filter(recipients__in=([violator_id]), object=object_id, type=type)
        if queryset.exists():
            res = 1
        else:
            res = 0
        return Response(res)

    def is_ability_to_block(self, request):
        profile = request.user.profile
        data = request.data
        violator_id = int(data.get('violator_id'))
        object_id = int(data.get('object_id'))
        # проверим, получил ли участник 10 предупреждений
        queryset = Notification.objects.all().filter(recipients__in=([violator_id]),
                                                     type__in=[4, 5])[:10]
        if len(queryset) == 10:
            res = 1
        else:
            res = 0
        # не заблокирован ли данный участник уже?
        queryset = Profile.objects.all()
        profile = get_object_or_404(queryset, pk=violator_id)
        if (profile.is_blocked):
            res = 0
        return Response(res)

    def delete(self, request):
        queryset = Notification.objects.all()
        id = request.data.get('id')
        note = get_object_or_404(queryset, id=id)
        note.recipients.remove(request.user)
        return Response(True)


# жалобы
class ReportView(viewsets.ViewSet):
    def list(self, request):
        report_list = Report.objects.all()
        serializer = ReportSerializer(report_list, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        user = request.user
        object = data.get('object')
        type = data.get('type')
        violator = data.get('violator')
        option_data = {
            'object': object,
            'type': type,
            'violator': violator,
            'sender': user.profile.pk,
        }
        serializer = ReportCreateSerializer(data=option_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return JsonResponse(serializer.data, safe=False)


# поиск
class SearchView(viewsets.ViewSet):
    def list(self, request):
        search_str = request.POST.get('search_str')
        loaded_rooms_count = int(request.POST.get('loaded_rooms_count'))
        loaded_polls_count = int(request.POST.get('loaded_polls_count'))
        loaded_members_count = int(request.POST.get('loaded_members_count'))
        room_list = Room.objects.all().filter(Q(name__icontains=search_str)).distinct()
        room_list = room_list[loaded_rooms_count:loaded_rooms_count + 11]
        rooms_serializer = RoomListSerializer(room_list, many=True)
        poll_list = Poll.objects.all().filter(Q(question__icontains=search_str)).distinct()
        poll_list = poll_list[loaded_polls_count:loaded_polls_count + 11]
        polls_serializer = PollSerializer(poll_list, many=True)
        member_list = Profile.objects.all().filter(Q(name__icontains=search_str)).distinct()
        member_list = member_list[loaded_members_count:loaded_members_count + 11]
        members_serializer = ProfileSerializer(member_list, many=True)
        if room_list.count() > 10:
            control_room = 1
        else:
            control_room = 0
        if poll_list.count() > 10:
            control_poll = 1
        else:
            control_poll = 0
        if member_list.count() > 10:
            control_member = 1
        else:
            control_member = 0
        return Response({'rooms': rooms_serializer.data, 'polls': polls_serializer.data,
                         'members': members_serializer.data, 'control_room': control_room,
                         'control_poll': control_poll, 'control_member': control_member,
                         })


# admin-panel
class WorkplanView(viewsets.ViewSet):
    def list(self, request):
        list = Workplan.objects.all()
        serializer = WorkplanSerializer(list, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        profile = request.user.profile
        serializer = WorkplanCreateSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=profile)
        return JsonResponse({"note": serializer.data, "author_id": profile.id, "author_name": profile.name}, safe=False)

    def edit(self, request):
        queryset = Workplan.objects.all()
        id = request.data.get('id')
        profile = request.user.profile
        note = get_object_or_404(queryset, pk=id)
        serializer = WorkplanCreateSerializer(note, data=request.data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        serializer.save()
        return JsonResponse({"note": serializer.data, "author_id": profile.id, "author_name": profile.name}, safe=False)

    def delete(self, request):
        queryset = Workplan.objects.all()
        id = request.data.get('id')
        note = get_object_or_404(queryset, pk=id)
        note.delete()
        return Response(True)

    def set_rating(self, request):
        queryset = Workplan.objects.all()
        id = request.data.get('workplan_id')
        type = int(request.data.get('type'))
        plus_sended = int(request.data.get('plus_sended'))
        minus_sended = int(request.data.get('minus_sended'))
        note = get_object_or_404(queryset, pk=id)
        if (type == 0):
            if plus_sended == 1:
                note.rating -= 2
            else:
                note.rating -= 1
        if (type == 1):
            if minus_sended == 1:
                note.rating += 2
            else:
                note.rating += 1
        note.save()
        return JsonResponse(type, safe=False)


class UpdateView(viewsets.ViewSet):
    def list(self, request):
        list = Update.objects.all().order_by('-created_at')
        serializer = UpdateSerializer(list, many=True)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        profile = request.user.profile
        serializer = UpdateCreateSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=profile)
        return JsonResponse({"note": serializer.data, "author_id": profile.id, "author_name": profile.name}, safe=False)

    def edit(self, request):
        queryset = Update.objects.all()
        id = int(request.data.get('id'))
        profile = request.user.profile
        note = get_object_or_404(queryset, pk=id)
        serializer = UpdateCreateSerializer(note, data=request.data)
        if not serializer.is_valid():
            return JsonResponse(status=400, data=serializer.errors)
        serializer.save()
        return JsonResponse({"note": serializer.data, "author_id": profile.id, "author_name": profile.name}, safe=False)

    def delete(self, request):
        queryset = Update.objects.all()
        id = request.data.get('id')
        note = get_object_or_404(queryset, pk=id)
        note.delete()
        return Response(True)

    def set_rating(self, request):
        queryset = Update.objects.all()
        id = request.data.get('update_id')
        type = int(request.data.get('type'))
        plus_sended = int(request.data.get('plus_sended'))
        minus_sended = int(request.data.get('minus_sended'))
        note = get_object_or_404(queryset, pk=id)
        if (type == 0):
            if plus_sended == 1:
                note.rating -= 2
            else:
                note.rating -= 1
        if (type == 1):
            if minus_sended == 1:
                note.rating += 2
            else:
                note.rating += 1
        note.save()
        return JsonResponse(type, safe=False)


# гайды
class ArticleView(viewsets.ViewSet):
    def list(self, request, section_id):
        list = Article.objects.all().filter(section=section_id).distinct()
        serializer = ArticleSerializer(list, many=True)
        return Response(serializer.data)

    def search(self, request):
        search_str = request.POST.get('search_str')
        if search_str != "":
            list = Article.objects.all().filter(Q(name__icontains=search_str)).distinct()
            serializer = ArticleSerializer(list, many=True)
            return Response(serializer.data)
        else:
            return Response(False)

    def edit(self, request):
        data = request.data
        id = data.get('id')
        name = data.get('name')
        text = data.get('text')
        article = get_object_or_404(Article.objects, pk=id)
        article.name = name
        article.text = text
        article.save()
        serializer = ArticleSerializer(article, many=False)
        return JsonResponse(serializer.data, safe=False)


class ArticleIllustrationView(viewsets.ViewSet):
    def retrieve(self, request, id):
        image = get_object_or_404(ArticleIllustration, pk=id)
        serializer = ArticleIllustrationSerializer(image, many=False)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        serializer = ArticleIllustrationSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return JsonResponse(serializer.data, safe=False)

    def delete(self, request):
        queryset = ArticleIllustration.objects.all()
        id = int(request.data.get('id'))
        note = get_object_or_404(queryset, pk=id)
        note.delete()
        return Response(True)