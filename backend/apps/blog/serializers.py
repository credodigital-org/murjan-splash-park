from rest_framework import serializers
from .models import BlogPost


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "excerpt", "featured_image", "featured", "published_at"]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            "id", "title", "slug", "excerpt", "content", "featured_image",
            "meta_title", "meta_description", "published_at",
        ]
