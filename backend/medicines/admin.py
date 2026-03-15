from django.contrib import admin

from .models import Medicine


@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "created_at", "updated_at")
    search_fields = ("name", "category")
