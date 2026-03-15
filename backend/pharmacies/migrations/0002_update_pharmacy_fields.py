# Generated manually for Dewaye requirements

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("pharmacies", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="pharmacy",
            old_name="address",
            new_name="location",
        ),
        migrations.RenameField(
            model_name="pharmacy",
            old_name="phone",
            new_name="contact_phone",
        ),
        migrations.AlterField(
            model_name="pharmacy",
            name="location",
            field=models.CharField(max_length=255),
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="contact_email",
            field=models.EmailField(blank=True, default="", max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True,
                default=django.utils.timezone.now,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="pharmacy",
            name="updated_at",
            field=models.DateTimeField(
                auto_now=True,
                default=django.utils.timezone.now,
            ),
            preserve_default=False,
        ),
    ]
