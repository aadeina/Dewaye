from django.contrib import admin

from .models import Inventory


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ("pharmacy", "medicine", "quantity", "last_updated")
    search_fields = ("pharmacy__name", "medicine__name")
    list_filter = ("pharmacy", "medicine")
