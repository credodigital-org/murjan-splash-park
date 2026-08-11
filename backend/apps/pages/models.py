from django.db import models
from django.utils.text import slugify
from apps.core.models import TimeStampedModel


class Page(TimeStampedModel):
    """
    Generic editable content page — About, Attractions, Dining, FAQ, etc.
    Lets the client edit these sections from the admin panel instead of
    having them hardcoded in the frontend.
    """
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True, help_text="e.g. 'about', 'attractions', 'dining', 'faq'")
    content = models.TextField(help_text="Main body content (supports basic HTML/markdown as agreed with frontend)")
    featured_image = models.ImageField(upload_to="pages/", blank=True, null=True)

    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)

    is_published = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
