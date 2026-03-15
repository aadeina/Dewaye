from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from .models import Pharmacy
from .serializers import PharmacySerializer


class PharmacyViewSet(ModelViewSet):
    queryset = Pharmacy.objects.order_by("name")
    serializer_class = PharmacySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
