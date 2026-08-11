from django.contrib import admin
from django.utils.html import format_html
from .models import GalleryImage


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("thumbnail", "title", "category", "display_order", "featured", "is_active", "created_at")
    list_filter = ("category", "featured", "is_active")
    list_editable = ("display_order", "is_active")
    search_fields = ("title", "caption", "alt_text")
    readonly_fields = ("created_at", "updated_at", "preview")
    fieldsets = (
        (None, {"fields": ("title", "image", "preview", "alt_text", "caption")}),
        ("Organization", {"fields": ("category", "display_order", "featured", "is_active")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    def thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', obj.image.url)
        return "—"
    thumbnail.short_description = "Preview"

    def preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height:200px;border-radius:6px;" />', obj.image.url)
        return "No image uploaded yet"
    preview.short_description = "Image Preview"
