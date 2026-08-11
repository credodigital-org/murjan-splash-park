from rest_framework import viewsets, permissions
from .models import GalleryImage
from .serializers import GalleryImageSerializer


class GalleryImageViewSet(viewsets.ModelViewSet):
    """
    Public: GET (list/retrieve) — only active images.
    Admin (authenticated staff): full CRUD.
    """
    serializer_class = GalleryImageSerializer

    def get_queryset(self):
        qs = GalleryImage.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True)
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
