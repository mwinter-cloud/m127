from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.models import User


class UserPasswordChangeForm(SetPasswordForm):
    class Meta:
        model = User
        fields = ('password')