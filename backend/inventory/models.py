from django.db import models
from pharmacies.models import Pharmacy
from medicines.models import Medicine

class Inventory(models.Model):
    pharmacy = models.ForeignKey(Pharmacy, on_delete=models.CASCADE)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)