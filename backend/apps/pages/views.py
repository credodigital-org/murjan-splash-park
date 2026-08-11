from rest_framework import viewsets, permissions
from .models import Page
from .serializers import PageSerializer


class PageViewSet(viewsets.ModelViewSet):
    lookup_field = "slug"

    def get_queryset(self):
        qs = Page.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_published=True)
        return qs

    serializer_class = PageSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
