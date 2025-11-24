from rest_framework import routers
from .views import ItemViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', include(router.urls))
]