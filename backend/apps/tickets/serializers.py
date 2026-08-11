from rest_framework import serializers
from .models import TicketType


class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = ["id", "name", "age_group", "description", "price", "currency", "display_order"]
