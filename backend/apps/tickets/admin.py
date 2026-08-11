from django.contrib import admin
from .models import TicketType


@admin.register(TicketType)
class TicketTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "age_group", "price", "currency", "display_order", "is_active", "updated_at")
    list_editable = ("price", "display_order", "is_active")
    list_filter = ("is_active",)
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("name", "age_group", "description")}),
        ("Pricing", {
            "fields": ("price", "currency"),
            "description": "REMINDER: this price is DISPLAY ONLY on the website. "
                            "Update the matching price in Wix so checkout stays consistent.",
        }),
        ("Display", {"fields": ("display_order", "is_active")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )
