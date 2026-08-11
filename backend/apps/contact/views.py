from rest_framework import viewsets, permissions, mixins
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageViewSet(mixins.CreateModelMixin,
                             mixins.ListModelMixin,
                             mixins.DestroyModelMixin,
                             mixins.UpdateModelMixin,
                             viewsets.GenericViewSet):
    """
    Public: POST only (submit a message).
    Admin: list/view/mark-read/delete.

    NOTE (v1 simplification): rate limiting is intentionally left out for now
    per project decision -- this is the one public POST endpoint in the API,
    so add django-ratelimit (or similar) here before public launch to prevent
    spam/abuse. Do not ship to production without it.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
