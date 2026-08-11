from rest_framework import viewsets, permissions
from .models import TicketType
from .serializers import TicketTypeSerializer


class TicketTypeViewSet(viewsets.ModelViewSet):
    serializer_class = TicketTypeSerializer

    def get_queryset(self):
        qs = TicketType.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True)
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
