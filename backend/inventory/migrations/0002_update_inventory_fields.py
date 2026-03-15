# Generated manually for Dewaye requirements

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("pharmacies", "0002_update_pharmacy_fields"),
        ("medicines", "0002_update_medicine_fields"),
        ("inventory", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="inventory",
            name="pharmacy",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="inventory_items",
                to="pharmacies.pharmacy",
            ),
        ),
        migrations.AlterField(
            model_name="inventory",
            name="medicine",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="inventory_items",
                to="medicines.medicine",
            ),
        ),
        migrations.AlterField(
            model_name="inventory",
            name="quantity",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name="inventory",
            name="last_updated",
            field=models.DateTimeField(
                auto_now=True,
                default=django.utils.timezone.now,
            ),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name="inventory",
            unique_together={("pharmacy", "medicine")},
        ),
    ]
