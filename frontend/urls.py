from django.urls import path, re_path
from django.conf import settings
from .views import *


urlpatterns = [
    path('change-password-operation/<int:code>', change_password),
    # Исключаем статические и медиа-файлы из catch-all маршрута
    re_path(r'^(?!static/)(?!media/)(?!api/)', IndexView.as_view()),
]

