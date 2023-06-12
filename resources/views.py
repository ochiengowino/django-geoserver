from django.shortcuts import render
from .models import Shop
from .serializers import ShopSerializer
from rest_framework import generics
from django.views.generic import TemplateView
from django.core import serializers
# Create your views here.
class HomeView(TemplateView):
    template_name = 'home.html'

    def shop(self):
        shop = Shop.objects.all()
        return serializers.serialize('geojson',shop)
    

    
class ShopAPI(generics.ListAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class TestView(TemplateView):
    template_name = 'test.html'

class SrtmView(TemplateView):
    template_name = 'srtm.html'

