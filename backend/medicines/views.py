from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from .models import Medicine
from .serializers import MedicineSerializer


class MedicineViewSet(ModelViewSet):
    queryset = Medicine.objects.order_by("name")
    serializer_class = MedicineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
