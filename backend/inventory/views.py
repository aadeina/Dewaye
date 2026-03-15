from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from .models import Inventory
from .serializers import InventorySerializer


class InventoryViewSet(ModelViewSet):
    queryset = Inventory.objects.select_related("pharmacy", "medicine").order_by("-last_updated")
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
