from rest_framework import viewsets, permissions
from .models import BlogPost
from .serializers import BlogPostListSerializer, BlogPostDetailSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    lookup_field = "slug"

    def get_queryset(self):
        qs = BlogPost.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(status="published")
        return qs

    def get_serializer_class(self):
        if self.action == "list":
            return BlogPostListSerializer
        return BlogPostDetailSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
