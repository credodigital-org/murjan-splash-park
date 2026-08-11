from rest_framework import serializers
from .models import (
    SiteSettings, WorkingHours, SpecialHours, AnnouncementBanner, PageSEO,
    HeroSection, FeatureHighlight, Testimonial,
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = [
            "site_name", "phone", "email", "address", "google_maps_embed_url",
            "instagram_url", "facebook_url", "twitter_url", "whatsapp_number",
            "footer_text", "copyright_text", "booking_redirect_url",
            "default_meta_title", "default_meta_description", "default_og_image",
        ]


# class WorkingHoursSerializer(serializers.ModelSerializer):
#     day_display = serializers.CharField(source="get_day_display", read_only=True)

#     class Meta:
#         model = WorkingHours
#         fields = ["day", "day_display", "opening_time", "closing_time", "is_closed"]


class WorkingHoursSerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(
        source="get_day_display",
        read_only=True
    )

    class Meta:
        model = WorkingHours
        fields = [
            "id",               # <-- ADD THIS
            "day",
            "day_display",
            "opening_time",
            "closing_time",
            "is_closed",
        ]

class SpecialHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialHours
        fields = ["date", "label", "opening_time", "closing_time", "is_closed"]


class AnnouncementBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnouncementBanner
        fields = ["id", "text", "cta_text", "cta_url", "expires_at"]


class PageSEOSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageSEO
        fields = ["page_slug", "meta_title", "meta_description", "og_image"]


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = ["headline", "subheadline", "background_image", "cta_text"]


class FeatureHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureHighlight
        fields = ["id", "icon", "image", "title", "description", "display_order"]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["id", "guest_name", "location", "quote", "rating", "display_order"]
