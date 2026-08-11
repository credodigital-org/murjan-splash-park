from rest_framework.routers import DefaultRouter
from .views import TicketTypeViewSet

router = DefaultRouter()
router.register(r"", TicketTypeViewSet, basename="pricing")

urlpatterns = router.urls
