from datetime import date
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from apps.site_settings.models import (
    SiteSettings, AnnouncementBanner, HeroSection, FeatureHighlight, Testimonial,
)
from apps.site_settings.serializers import (
    SiteSettingsSerializer, AnnouncementBannerSerializer,
    HeroSectionSerializer, FeatureHighlightSerializer, TestimonialSerializer,
)
from apps.gallery.models import GalleryImage
from apps.gallery.serializers import GalleryImageSerializer
from apps.blog.models import BlogPost
from apps.blog.serializers import BlogPostListSerializer
from apps.tickets.models import TicketType
from apps.tickets.serializers import TicketTypeSerializer


class HomeAggregateView(APIView):
    """
    Single call for the homepage: hero, settings, active banner, feature
    highlights, featured gallery, testimonials, latest blog posts, ticket
    pricing. Reduces round trips the frontend needs on first paint.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        settings_obj, _ = SiteSettings.objects.get_or_create(pk=1)
        hero_obj, _ = HeroSection.objects.get_or_create(pk=1)
        banner = (
            AnnouncementBanner.objects.filter(is_active=True)
            .exclude(expires_at__lt=date.today())
            .first()
        )
        features = FeatureHighlight.objects.filter(is_active=True)
        gallery = GalleryImage.objects.filter(is_active=True)[:8]
        testimonials = Testimonial.objects.filter(is_active=True)
        posts = BlogPost.objects.filter(status="published")[:3]
        pricing = TicketType.objects.filter(is_active=True)

        ctx = {"request": request}
        return Response({
            "hero": HeroSectionSerializer(hero_obj, context=ctx).data,
            "settings": SiteSettingsSerializer(settings_obj, context=ctx).data,
            "banner": AnnouncementBannerSerializer(banner, context=ctx).data if banner else None,
            "features": FeatureHighlightSerializer(features, many=True, context=ctx).data,
            "gallery": GalleryImageSerializer(gallery, many=True, context=ctx).data,
            "testimonials": TestimonialSerializer(testimonials, many=True, context=ctx).data,
            "latest_blog_posts": BlogPostListSerializer(posts, many=True, context=ctx).data,
            "pricing": TicketTypeSerializer(pricing, many=True, context=ctx).data,
        })
