from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('change-password-operation/<int:code>', change_password),
    re_path(r'^', IndexView.as_view()),
]

