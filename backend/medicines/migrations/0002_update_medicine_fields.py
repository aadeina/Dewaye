# Generated manually for Dewaye requirements

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("medicines", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="medicine",
            name="category",
            field=models.CharField(default="General", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="medicine",
            name="price",
            field=models.DecimalField(
                decimal_places=2,
                default=0,
                max_digits=10,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="medicine",
            name="stock",
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name="medicine",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True,
                default=django.utils.timezone.now,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="medicine",
            name="updated_at",
            field=models.DateTimeField(
                auto_now=True,
                default=django.utils.timezone.now,
            ),
            preserve_default=False,
        ),
    ]
