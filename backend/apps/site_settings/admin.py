from django.contrib import admin
from django.utils.html import format_html
from .models import (
    SiteSettings, WorkingHours, SpecialHours, AnnouncementBanner, PageSEO,
    HeroSection, FeatureHighlight, Testimonial,
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("General", {"fields": ("site_name",)}),
        ("Contact Info", {"fields": ("phone", "email", "address", "google_maps_embed_url")}),
        ("Social Links", {"fields": ("instagram_url", "facebook_url", "twitter_url", "whatsapp_number")}),
        ("Footer", {"fields": ("footer_text", "copyright_text")}),
        ("Booking", {"fields": ("booking_redirect_url",)}),
        ("Default SEO", {"fields": ("default_meta_title", "default_meta_description", "default_og_image")}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    readonly_fields = ("preview",)
    fieldsets = (
        (None, {"fields": ("headline", "subheadline", "cta_text")}),
        ("Background Image", {"fields": ("background_image", "preview")}),
    )

    def has_add_permission(self, request):
        return not HeroSection.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def preview(self, obj):
        if obj.background_image:
            return format_html('<img src="{}" style="max-height:200px;border-radius:6px;" />', obj.background_image.url)
        return "No image uploaded yet"
    preview.short_description = "Preview"


@admin.register(WorkingHours)
class WorkingHoursAdmin(admin.ModelAdmin):
    list_display = ("day", "opening_time", "closing_time", "is_closed")
    list_editable = ("opening_time", "closing_time", "is_closed")


@admin.register(SpecialHours)
class SpecialHoursAdmin(admin.ModelAdmin):
    list_display = ("date", "label", "opening_time", "closing_time", "is_closed")
    list_filter = ("is_closed",)
    date_hierarchy = "date"


@admin.register(AnnouncementBanner)
class AnnouncementBannerAdmin(admin.ModelAdmin):
    list_display = ("text", "is_active", "expires_at")
    list_filter = ("is_active",)
    list_editable = ("is_active",)


@admin.register(PageSEO)
class PageSEOAdmin(admin.ModelAdmin):
    list_display = ("page_slug", "meta_title")
    search_fields = ("page_slug",)


@admin.register(FeatureHighlight)
class FeatureHighlightAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "display_order", "is_active")
    list_editable = ("display_order", "is_active")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("guest_name", "location", "rating", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    list_filter = ("rating", "is_active")
    search_fields = ("guest_name", "quote")
