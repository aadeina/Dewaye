from django.contrib import admin

from .models import Pharmacy


@admin.register(Pharmacy)
class PharmacyAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "location",
        "contact_phone",
        "contact_email",
        "created_at",
        "updated_at",
    )
    search_fields = ("name", "location", "contact_phone", "contact_email")
