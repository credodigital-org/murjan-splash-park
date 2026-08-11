from django.contrib.auth.models import AbstractUser
from django.db import models


class AdminUser(AbstractUser):
    """
    Custom user model for the admin panel.
    is_staff  -> can log into the admin panel
    is_superuser -> full access, can manage other admin users
    """
    ROLE_CHOICES = [
        ("owner", "Owner"),
        ("manager", "Manager"),
        ("content_editor", "Content Editor"),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="content_editor")
    phone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.username
