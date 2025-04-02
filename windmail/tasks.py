from datetime import timedelta
from api.models import Report, Answer, Notification, Voice, Comment, Room, Poll, Operation
from django.utils import timezone


def autodelete():
    #удалить жалобы, которые добавлены более суток назад
    how_many_days = 1
    old_reports = Report.objects.filter(created_at__lte=timezone.now() - timedelta(days=how_many_days))
    for report in old_reports:
        report.delete()

    # удалить уведомления, которым более 30 дней
    how_many_days = 30
    old_notes = Notification.objects.filter(created_at__lte=timezone.now() - timedelta(days=how_many_days))
    for note in old_notes:
        note.delete()

    # удалить жалобы, которым более 1 дня
    how_many_days = 1
    old_notes = Notification.objects.filter(created_at__lte=timezone.now() - timedelta(days=how_many_days))
    for note in old_notes:
        note.delete()
        
    # удалить операции, которым более 1 дня
    how_many_days = 1
    operations = Operation.objects.filter(created_at__lte=timezone.now() - timedelta(days=how_many_days))
    for operation in operations:
        operation.delete()

    # очистить все просмотры
    rooms = Room.objects.all()
    for room in rooms:
        room.views = 0
        room.save()

    polls = Poll.objects.all()
    for poll in polls:
        poll.views = 0
        poll.save()