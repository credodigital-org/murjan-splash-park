from datetime import date
from rest_framework import viewsets, views, permissions
from rest_framework.response import Response
from .models import (
    SiteSettings, WorkingHours, SpecialHours, AnnouncementBanner, PageSEO,
    HeroSection, FeatureHighlight, Testimonial,
)
from .serializers import (
    SiteSettingsSerializer, WorkingHoursSerializer, SpecialHoursSerializer,
    AnnouncementBannerSerializer, PageSEOSerializer,
    HeroSectionSerializer, FeatureHighlightSerializer, TestimonialSerializer,
)


class SiteSettingsView(views.APIView):
    """GET returns the singleton settings row. PATCH updates it (admin only)."""

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get(self, request):
        obj, _ = SiteSettings.objects.get_or_create(pk=1)
        return Response(SiteSettingsSerializer(obj, context={"request": request}).data)

    def patch(self, request):
        obj, _ = SiteSettings.objects.get_or_create(pk=1)
        serializer = SiteSettingsSerializer(obj, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class HeroSectionView(views.APIView):
    """GET returns the singleton hero content. PATCH updates it (admin only)."""

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get(self, request):
        obj, _ = HeroSection.objects.get_or_create(pk=1)
        return Response(HeroSectionSerializer(obj, context={"request": request}).data)

    def patch(self, request):
        obj, _ = HeroSection.objects.get_or_create(pk=1)
        serializer = HeroSectionSerializer(obj, data=request.data, partial=True, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class WorkingHoursViewSet(viewsets.ModelViewSet):
    queryset = WorkingHours.objects.all()
    serializer_class = WorkingHoursSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class SpecialHoursViewSet(viewsets.ModelViewSet):
    queryset = SpecialHours.objects.all()
    serializer_class = SpecialHoursSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class AnnouncementBannerViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementBannerSerializer

    def get_queryset(self):
        qs = AnnouncementBanner.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True).exclude(expires_at__lt=date.today())
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class PageSEOViewSet(viewsets.ModelViewSet):
    queryset = PageSEO.objects.all()
    serializer_class = PageSEOSerializer
    lookup_field = "page_slug"

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class FeatureHighlightViewSet(viewsets.ModelViewSet):
    serializer_class = FeatureHighlightSerializer

    def get_queryset(self):
        qs = FeatureHighlight.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True)
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class TestimonialViewSet(viewsets.ModelViewSet):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        qs = Testimonial.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True)
        return qs

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
