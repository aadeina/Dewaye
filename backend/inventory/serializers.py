from rest_framework import serializers

from .models import Inventory


class InventorySerializer(serializers.ModelSerializer):
    pharmacy_name = serializers.CharField(source="pharmacy.name", read_only=True)
    medicine_name = serializers.CharField(source="medicine.name", read_only=True)

    class Meta:
        model = Inventory
        fields = (
            "id",
            "pharmacy",
            "medicine",
            "quantity",
            "last_updated",
            "pharmacy_name",
            "medicine_name",
        )
        read_only_fields = ("last_updated", "pharmacy_name", "medicine_name")
