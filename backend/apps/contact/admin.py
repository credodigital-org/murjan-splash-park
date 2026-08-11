from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "replied_at", "created_at")
    list_filter = ("is_read",)
    list_editable = ("is_read",)
    search_fields = ("name", "email", "message")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("name", "email", "phone", "subject", "message")}),
        ("Status", {"fields": ("is_read", "replied_at")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )
