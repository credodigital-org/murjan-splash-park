from django.contrib import admin
from django.utils.html import format_html
from .models import Page


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "is_published", "updated_at")
    list_filter = ("is_published",)
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "content")
    readonly_fields = ("created_at", "updated_at", "preview")
    fieldsets = (
        (None, {"fields": ("title", "slug", "content")}),
        ("Media", {"fields": ("featured_image", "preview")}),
        ("SEO", {"fields": ("meta_title", "meta_description")}),
        ("Status", {"fields": ("is_published",)}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    def preview(self, obj):
        if obj.featured_image:
            return format_html('<img src="{}" style="max-height:200px;border-radius:6px;" />', obj.featured_image.url)
        return "No image uploaded yet"
    preview.short_description = "Featured Image Preview"
