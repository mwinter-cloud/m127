from django.views.generic import TemplateView
from api.models import Operation, Illustration
from django.shortcuts import get_object_or_404
from .forms import UserPasswordChangeForm
from django.shortcuts import redirect, render

class IndexView(TemplateView):
    template_name = 'frontend/index.html'
    
    def get_context_data(self, * args, ** kwargs):
        context = super().get_context_data( * args, ** kwargs)
        queryset = Illustration.objects.all()
        logo, created = queryset.get_or_create(type='L')
        citename, created = Customixation.objects.all().get_or_create(type='CN')
        context['logo'] = logo.text
        context['citename'] = citename.text
        return context

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
        