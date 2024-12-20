from django.contrib import admin

from .models import Customization, Color, Smile, Illustration, Profile, Tag, Carousel_room, Header_room, Room, \
    Poll, Voice, Option, Comment, Answer, Notification, Report, Workplan, Update, RoomVoice, Article, \
    ArticleIllustration, Operation, StarWarsVoice

admin.site.register(Customization)
admin.site.register(Color)
admin.site.register(Illustration)
admin.site.register(Smile)
admin.site.register(Profile)
admin.site.register(Tag)
admin.site.register(Carousel_room)
admin.site.register(Header_room)
admin.site.register(Room)
admin.site.register(Poll)
admin.site.register(Voice)
admin.site.register(Option)
admin.site.register(Comment)
admin.site.register(Answer)
admin.site.register(Notification)
admin.site.register(Report)
admin.site.register(Workplan)
admin.site.register(Update)
admin.site.register(RoomVoice)
admin.site.register(Article)
admin.site.register(ArticleIllustration)
admin.site.register(Operation)
admin.site.register(StarWarsVoice)