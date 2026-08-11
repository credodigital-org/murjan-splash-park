from django.db import models
from apps.core.models import TimeStampedModel


class SiteSettings(TimeStampedModel):
    """
    Singleton-style model — only one row should ever exist.
    Holds global site info: contact details, socials, footer, SEO defaults.
    """
    site_name = models.CharField(max_length=150, default="Murjan Splash Park")
    phone = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    google_maps_embed_url = models.URLField(blank=True)

    instagram_url = models.URLField(blank=True)
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    whatsapp_number = models.CharField(max_length=30, blank=True)

    footer_text = models.TextField(blank=True)
    copyright_text = models.CharField(max_length=200, blank=True)

    booking_redirect_url = models.URLField(
        default="https://book.murjansplashpark.com",
        help_text="Where the 'Book Tickets' button sends visitors (Wix booking site).",
    )

    default_meta_title = models.CharField(max_length=160, blank=True)
    default_meta_description = models.CharField(max_length=300, blank=True)
    default_og_image = models.ImageField(upload_to="seo/", blank=True, null=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce singleton
        super().save(*args, **kwargs)

    def __str__(self):
        return "Site Settings"


class WorkingHours(TimeStampedModel):
    DAY_CHOICES = [
        ("mon", "Monday"), ("tue", "Tuesday"), ("wed", "Wednesday"),
        ("thu", "Thursday"), ("fri", "Friday"), ("sat", "Saturday"), ("sun", "Sunday"),
    ]
    day = models.CharField(max_length=3, choices=DAY_CHOICES, unique=True)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    is_closed = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Working Hours"
        verbose_name_plural = "Working Hours"
        ordering = ["id"]

    def __str__(self):
        return f"{self.get_day_display()}: {self.opening_time}–{self.closing_time}"


class SpecialHours(TimeStampedModel):
    """Holiday overrides / special event timings for a specific date."""
    date = models.DateField(unique=True)
    label = models.CharField(max_length=150, help_text="e.g. 'Eid Holiday', 'New Year's Eve'")
    opening_time = models.TimeField(blank=True, null=True)
    closing_time = models.TimeField(blank=True, null=True)
    is_closed = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Special Hours"
        verbose_name_plural = "Special Hours"
        ordering = ["date"]

    def __str__(self):
        return f"{self.date} — {self.label}"


class AnnouncementBanner(TimeStampedModel):
    text = models.CharField(max_length=250)
    cta_text = models.CharField(max_length=50, blank=True)
    cta_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)
    expires_at = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.text[:50]


class PageSEO(TimeStampedModel):
    """Per-page SEO overrides — Home, Attractions, Dining, Tickets, etc."""
    page_slug = models.SlugField(unique=True, help_text="e.g. 'home', 'attractions', 'tickets'")
    meta_title = models.CharField(max_length=160)
    meta_description = models.CharField(max_length=300)
    og_image = models.ImageField(upload_to="seo/", blank=True, null=True)

    class Meta:
        verbose_name = "Page SEO"
        verbose_name_plural = "Page SEO"

    def __str__(self):
        return self.page_slug


class HeroSection(TimeStampedModel):
    """
    Homepage hero banner content — headline, subtext, CTA, background image.
    Singleton-style, same pattern as SiteSettings.
    """
    headline = models.CharField(max_length=200, default="Dive in to endless fun")
    subheadline = models.CharField(max_length=250, blank=True, default="Welcome Fantasea")
    background_image = models.ImageField(upload_to="hero/", blank=True, null=True)
    cta_text = models.CharField(max_length=50, default="Book Tickets")

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return "Homepage Hero"


class FeatureHighlight(TimeStampedModel):
    """
    'Why families love Murjan' cards — certified lifeguards, 20+ rides, etc.
    Supports either an emoji/text icon OR a custom illustration image —
    the frontend's actual design uses illustrated icons, not emoji.
    """
    icon = models.CharField(max_length=50, blank=True, help_text="Icon name or emoji, used only if no image is set")
    image = models.ImageField(upload_to="features/", blank=True, null=True, help_text="Illustration icon (preferred — matches the live site's design)")
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]
        verbose_name = "Feature Highlight"

    def __str__(self):
        return self.title


class Testimonial(TimeStampedModel):
    guest_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True)
    quote = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return f"{self.guest_name} ({self.rating}★)"
