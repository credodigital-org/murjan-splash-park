from django.db import models
from django.utils.text import slugify
from apps.core.models import TimeStampedModel


class BlogPost(TimeStampedModel):
    STATUS_CHOICES = [("draft", "Draft"), ("published", "Published")]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    excerpt = models.CharField(max_length=300, blank=True, help_text="Short summary shown on blog listing cards")
    content = models.TextField()
    featured_image = models.ImageField(upload_to="blog/", blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="draft")
    featured = models.BooleanField(default=False, help_text="Show in homepage featured blog section")

    meta_title = models.CharField(max_length=160, blank=True)
    meta_description = models.CharField(max_length=300, blank=True)

    published_at = models.DateTimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
