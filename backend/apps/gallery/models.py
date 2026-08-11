from django.db import models
from apps.core.models import TimeStampedModel


class GalleryImage(TimeStampedModel):
    CATEGORY_CHOICES = [
        ("water_slides", "Water Slides"),
        ("lazy_river", "Lazy River"),
        ("kiddie_zone", "Kiddie Splash Zone"),
        ("dining", "Dining & Delights"),
        ("events", "Events"),
        ("general", "General"),
    ]
    title = models.CharField(max_length=150, blank=True)
    image = models.ImageField(upload_to="gallery/")
    alt_text = models.CharField(max_length=150, blank=True, help_text="Accessibility & SEO description of the image")
    caption = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default="general")
    display_order = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False, help_text="Show in homepage gallery/attractions preview")
    link_url = models.CharField(max_length=200, blank=True, help_text="Optional: where this card links to when used as a homepage preview card, e.g. '/attractions'")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title or self.caption or f"Image {self.pk}"
