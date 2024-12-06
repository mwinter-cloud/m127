from django.db import models
from PIL import Image
from django.contrib.auth.models import User

class Color(models.Model):
    SITE_COLOR = 'SC'
    ANNOUNCEMENT_BLOCK = 'AB'
    EARLY_MORNING_COLORLINE = 'EMC'
    MORNING_COLORLINE = 'MC'
    DAY_COLORLINE = 'DAC'
    EVENING_COLORLINE = 'EC'
    SELECTED_OPTION = 'SO'
    VOTE_BUTTON = 'VB'
    VIOLET = 'violet'
    DARK_BLUE = 'd_blue'
    BLUE = 'blue'
    YELLOW = 'yellow'
    PINK = 'pink'
    GREEN = 'green'
    GRAY = 'gray'
    CHERRY = 'cherry'
    ORANGE = 'orange'
    RED = 'red'
    WHITE = 'white'
    BLACK = 'black'
    TYPES_CHOICES = [
        (SITE_COLOR, 'Основной цвет сайта'),
        (ANNOUNCEMENT_BLOCK, 'Блок с объявлением'),
        (EARLY_MORNING_COLORLINE, 'Цветная полоса рано утром'),
        (MORNING_COLORLINE, 'Цветная полоса утром'),
        (DAY_COLORLINE, 'Цветная полоса днем'),
        (EVENING_COLORLINE, 'Цветная полоса вечером'),
        (SELECTED_OPTION, 'Активный вариант ответа'),
        (VOTE_BUTTON, 'Кнопка отправки голоса'),
        (VIOLET, 'Фиолетовый'),
        (DARK_BLUE, 'Темно-синий'),
        (YELLOW, 'Желтый'),
        (PINK, 'Розовый'),
        (RED, 'Красный'),
        (BLUE, 'Синий'),
        (GREEN, 'Зеленый'),
        (GRAY, 'Серый'),
        (CHERRY, 'Вишневый'),
        (ORANGE, 'Оранжевый'),
        (WHITE, 'Белый'),
        (BLACK, 'Черный'),
    ]
    type = models.CharField(
        max_length=6,
        choices=TYPES_CHOICES,
        default=SITE_COLOR
    )
    text = models.CharField(max_length=150, blank=True)
    is_palette = models.BooleanField(default=False)

    def __str__(self):
        return self.type

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=30, unique=True)
    email = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=30, blank=True)
    avatar = models.ImageField(upload_to='members/avatars', blank=True)
    cover = models.ImageField(upload_to='members/covers', blank=True)
    post_text = models.CharField(max_length=3000, blank=True)
    post_title = models.CharField(max_length=50, blank=True)
    post_image = models.ImageField(upload_to='members/postimgs', blank=True)
    post_created_at = models.DateTimeField(auto_now_add=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, default=1, blank=True, null=True)
    webcite = models.CharField(max_length=60, blank=True)
    is_admin = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    email_confirm = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    inviter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inviter', blank=True, null=True)

    def save(self, *args, **kwargs):
        super().save()
        if self.avatar:
            img = Image.open(self.avatar.path)

            if img.height > 500 or img.width > 500:
                output_size = (500, 500)
                img.thumbnail(output_size)
                img.save(self.avatar.path)

    def __str__(self):
        return self.name

class Operation(models.Model):
    code = models.CharField(max_length=30, unique=True)
    type = models.IntegerField(default=0) #1-confirmemail,2-changepassword,3-changeemail,4-invite
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    info = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.code

class Tag(models.Model):
    name = models.CharField(max_length=90)

    def __str__(self):
        return self.name
        
    def save(self, *args, **kwargs):
        self.name = self.name.lower() if self.name else None
        return super().save(*args, **kwargs)

class Room(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='room_author', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(max_length=5000)
    tags = models.ManyToManyField(Tag, blank='True')
    saved_by = models.ManyToManyField(User, blank='True')
    views = models.IntegerField(default=0)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, blank=True, null=True)
    cover = models.ImageField(upload_to='rooms/covers', blank=True)
    COMMON = 'CMN'
    ADMINISTRATION = 'ADM'
    OFFICIAL = 'OFC'
    TYPES_CHOICES = [
        (COMMON, 'Общие'),
        (ADMINISTRATION, 'Административные'),
        (OFFICIAL, 'Служебные'),
    ]
    type = models.CharField(
        max_length=3,
        choices=TYPES_CHOICES,
        default=COMMON,
    )

    def save(self, *args, **kwargs):
        super().save()
        if self.cover:
            img = Image.open(self.cover.path)

            if img.height > 1500 or img.width > 1500:
                output_size = (1500, 1500)
                img.thumbnail(output_size)
                img.save(self.cover.path)

    def __str__(self):
        return self.name

class Answer(models.Model):
    text = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='room_answer_author', blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='answers', blank=True)
    NORMAL = "1"
    HIDDEN = "2"
    TYPES_CHOICES = [
        (NORMAL, 'Нормальная'),
        (HIDDEN, 'Скрытая'),
    ]
    type = models.CharField(
        max_length=1,
        choices=TYPES_CHOICES,
        default=NORMAL,
    )

    def __str__(self):
            return self.text

class Carousel_room(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    cover = models.ImageField(upload_to='rooms/main-rooms-covers', blank=True)

    def __str__(self):
        return self.room.name

    def save(self, *args, **kwargs):
        super().save()
        if self.cover:
            img = Image.open(self.cover.path)

            if img.height > 900 or img.width > 900:
                output_size = (900, 900)
                img.thumbnail(output_size)
                img.save(self.cover.path)

class RoomVoice(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Carousel_room, on_delete=models.CASCADE)
    grade = models.IntegerField(default=0)

class Header_room(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    cover = models.ImageField(upload_to='rooms/main-rooms-covers', blank=True)

    def __str__(self):
        return self.room.name

    def save(self, *args, **kwargs):
        super().save()
        if self.cover:
            img = Image.open(self.cover.path)

            if img.height > 500 or img.width > 500:
                output_size = (500, 500)
                img.thumbnail(output_size)
                img.save(self.cover.path)

class Poll(models.Model):
    question = models.CharField(max_length=250)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='poll_author', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank='True')
    saved_by = models.ManyToManyField(User, blank='True')
    COMMON = 'CMN'
    ADMINISTRATION = 'ADM'
    OFFICIAL = 'OFC'
    TYPES_CHOICES = [
        (COMMON, 'Общие'),
        (ADMINISTRATION, 'Административные'),
        (OFFICIAL, 'Служебные'),
    ]
    type = models.CharField(
        max_length=3,
        choices=TYPES_CHOICES,
        default=COMMON,
    )

    def __str__(self):
        return self.question

class Option(models.Model):
    text = models.CharField(max_length=250)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='options')

    def __str__(self):
        return self.text

class Voice(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    text = models.CharField(max_length=1000)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comment_author')
    created_at = models.DateTimeField(auto_now_add=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)

    def __str__(self):
        return self.text

#служебные
class Notification(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sender')
    recipients = models.ManyToManyField(User, related_name='recipients')
    text = models.CharField(max_length=100, blank=True)
    type = models.IntegerField(default=0) #0-спасибо,1-ответ,2-сообщение в комнате,3-жалоба,4-предупреждение за ответ и 5 за опрос
    object = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    viewed = models.CharField(max_length=200, blank=True)

class Report(models.Model):
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='report_sender')
    violator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='violator')
    object = models.IntegerField()
    type = models.IntegerField(default=1) #1-комната,2-опрос
    object = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

#кастомизация
class Customization(models.Model):
    CITE_NAME = 'CN'
    ANNOUNCEMENT = 'AN'
    RULES = 'RL'
    SITE_DESCRIPTION = 'SD'
    CONTACTS = 'CT'
    TYPES_CHOICES = [
        (CITE_NAME, 'Название сайта'),
        (ANNOUNCEMENT, 'Объявление'),
        (RULES, 'Правила'),
        (SITE_DESCRIPTION, 'Описание сайта'),
        (CONTACTS, 'Контакты'),
    ]
    type = models.CharField(
        max_length=2,
        choices=TYPES_CHOICES,
        default=ANNOUNCEMENT,
    )
    text = models.CharField(max_length=1000, blank=True)

class Illustration(models.Model):
    LOGO = 'L'
    INVITE = 'IN'
    DEFAULT_AVATAR = 'DA'
    DEFAULT_COVER = 'DC'
    ERROR_PAGE_IMG = 'EP'
    ADMIN_PANEL_IMG = 'AP'
    GUIDE_SEARCH_COVER = 'GC'
    LOGIN_PAGE = 'LP'
    REGISTRATION_PAGE = 'RP'
    TYPES_CHOICES = [
        (LOGO, 'Логотип'),
        (INVITE, 'Приглашение'),
        (DEFAULT_AVATAR, 'Аватар по умолчанию'),
        (DEFAULT_COVER, 'Обложка по умолчанию'),
        (ERROR_PAGE_IMG, 'Страница с ошибкой'),
        (ADMIN_PANEL_IMG, 'Иллюстрация админ-панели'),
        (GUIDE_SEARCH_COVER, 'Иллюстрация в руководстве'),
        (LOGIN_PAGE, 'Иллюстрация на странице входа'),
        (REGISTRATION_PAGE, 'Иллюстрация для регистрации'),
    ]
    type = models.CharField(
        max_length=2,
        choices=TYPES_CHOICES,
        default=ADMIN_PANEL_IMG,
    )
    text = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.type


class Smile(models.Model):
    name = models.CharField(max_length=30)
    file = models.ImageField(upload_to='customization/smiles/')

    def save(self, *args, **kwargs):
        super().save()
        if self.file:
            img = Image.open(self.file.path)
            if img.format.lower() != 'gif':
                return False
            try:
                img.seek(1)
            except EOFError:
                return False
            else:
                return True

            if img.height > 64 or img.width > 64:
                output_size = (64, 64)
                img.thumbnail(output_size)
                img.save(self.file.path)

    def __str__(self):
        return self.name
        
    

#admin-panel
class Workplan(models.Model):
    PANEL = 'P'
    CODE = 'C'
    TYPES_CHOICES = [
        (PANEL, 'В панели'),
        (CODE, 'В коде'),
    ]
    type = models.CharField(
        max_length=1,
        choices=TYPES_CHOICES,
        default=PANEL,
    )
    name = models.CharField(max_length=90)
    description = models.CharField(max_length=500, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=0)
    start = models.CharField(max_length=30)
    end = models.CharField(max_length=30)

class Update(models.Model):
    PANEL = 'P'
    CODE = 'C'
    TYPES_CHOICES = [
        (PANEL, 'В панели'),
        (CODE, 'В коде'),
    ]
    type = models.CharField(
        max_length=1,
        choices=TYPES_CHOICES,
        default=PANEL,
    )
    name = models.CharField(max_length=90)
    description = models.CharField(max_length=500, blank=True)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(default=0)

#руководство
class Article(models.Model):
    CONCEPT = "1"
    GUIDE_TO_USE = "2"
    BACKEND_CODE = "3"
    FRONTEND_CODE = "4"
    SOCIAL_ORGANIZATION = "5"
    PROGRAMMING = "6"
    TYPES_CHOICES = [
        (CONCEPT, 'Концепция'),
        (GUIDE_TO_USE, 'Руководство по использованию'),
        (BACKEND_CODE, 'Описание кода backend'),
        (FRONTEND_CODE, 'Описание кода frontend'),
        (SOCIAL_ORGANIZATION, 'Учебные материалы по организации сообщества'),
        (PROGRAMMING, 'Учебные материалы для программистов'),
    ]
    section = models.CharField(
        max_length=2,
        choices=TYPES_CHOICES,
        default=CONCEPT,
    )
    name = models.CharField(max_length=150)
    text = models.TextField(max_length=10000)
    updated_at = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class ArticleIllustration(models.Model):
    description = models.CharField(max_length=150, blank=True)
    file = models.ImageField(upload_to='illustrations', blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, blank='True', default=None, related_name='illustrations')

    def save(self, *args, **kwargs):
        super().save()
        if self.file:
            img = Image.open(self.file.path)

            if img.height > 1000 or img.width > 1000:
                output_size = (1000, 1000)
                img.thumbnail(output_size)
                img.save(self.file.path)