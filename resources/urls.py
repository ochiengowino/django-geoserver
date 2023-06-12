from django.urls import path, include
from resources.views import ShopAPI, HomeView, TestView, SrtmView

urlpatterns = [
    path('shop/api', ShopAPI.as_view(), name='shop_api'),
    path('', HomeView.as_view(), name='home'),
    path('test', TestView.as_view(), name='test'),
    path('geoserver/srtm', SrtmView.as_view(), name='srtm'),
]