from django.db import models
from apps.core.models import TimeStampedModel


class TicketType(TimeStampedModel):
    """
    DISPLAY-ONLY pricing shown on the Tickets Info page.
    This does NOT process payments and is NOT connected to Wix checkout.
    Actual checkout price is enforced on Wix — if this price changes,
    it must also be updated in the Wix dashboard to stay consistent.
    """
    name = models.CharField(max_length=100, help_text="e.g. Adult, Child (3-12), Family Pack")
    age_group = models.CharField(max_length=50, blank=True, help_text="e.g. '13+', '3-12', 'Under 3'")
    description = models.CharField(max_length=250, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    currency = models.CharField(max_length=3, default="AED")
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"{self.name} — {self.currency} {self.price}"
