from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsView, HeroSectionView, WorkingHoursViewSet, SpecialHoursViewSet,
    AnnouncementBannerViewSet, PageSEOViewSet, FeatureHighlightViewSet, TestimonialViewSet,
)

router = DefaultRouter()
router.register(r"working-hours", WorkingHoursViewSet, basename="working-hours")
router.register(r"special-hours", SpecialHoursViewSet, basename="special-hours")
router.register(r"announcements", AnnouncementBannerViewSet, basename="announcements")
router.register(r"seo", PageSEOViewSet, basename="seo")
router.register(r"features", FeatureHighlightViewSet, basename="features")
router.register(r"testimonials", TestimonialViewSet, basename="testimonials")

urlpatterns = [
    path("", SiteSettingsView.as_view(), name="site-settings"),
    path("hero/", HeroSectionView.as_view(), name="hero-section"),
] + router.urls
