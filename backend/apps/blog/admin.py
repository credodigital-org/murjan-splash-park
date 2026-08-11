from django.contrib import admin
from django.utils.html import format_html
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("thumbnail", "title", "status", "featured", "published_at", "created_at")
    list_filter = ("status", "featured")
    list_editable = ("featured",)
    search_fields = ("title", "content", "excerpt")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at", "preview")
    fieldsets = (
        (None, {"fields": ("title", "slug", "excerpt", "content")}),
        ("Media", {"fields": ("featured_image", "preview")}),
        ("SEO", {"fields": ("meta_title", "meta_description")}),
        ("Publishing", {"fields": ("status", "featured", "published_at")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    def thumbnail(self, obj):
        if obj.featured_image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', obj.featured_image.url)
        return "—"
    thumbnail.short_description = "Image"

    def preview(self, obj):
        if obj.featured_image:
            return format_html('<img src="{}" style="max-height:200px;border-radius:6px;" />', obj.featured_image.url)
        return "No image uploaded yet"
    preview.short_description = "Featured Image Preview"
