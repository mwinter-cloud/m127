from django.views.generic import TemplateView
from api.models import Operation
from django.shortcuts import get_object_or_404
from .forms import UserPasswordChangeForm
from django.shortcuts import redirect, render

class IndexView(TemplateView):
    template_name = 'frontend/index.html'

def change_password(request, code):
    queryset = Operation.objects.all()
    exist_operation = queryset.filter(code=code)
    if exist_operation:
        operation = get_object_or_404(queryset, code=code)
        user = operation.user
        if request.method == 'POST':
            form = UserPasswordChangeForm(user, request.POST)
            if form.is_valid():
                form.save()
                operation.delete()
                return redirect("../")
        else:
            form = UserPasswordChangeForm(user)
        context = {
            'form': form,
        }
        return render(request, 'forms/change-password.html', context=context)
    else:
        return redirect("../")