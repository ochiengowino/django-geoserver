from django.contrib import admin
from django.contrib.gis import admin
from .models import CoffeeType, Shop, Street, County
from leaflet.admin import LeafletGeoAdmin
# Register your models here.

@admin.register(CoffeeType)
class TypesAdmin(admin.ModelAdmin):
    
    pass

@admin.register(Shop)
# class ShopAdmin(admin.OSMGeoAdmin):
class ShopAdmin(LeafletGeoAdmin):

    pass

@admin.register(Street)
# class StreetAdmin(admin.OSMGeoAdmin):
class StreetAdmin(LeafletGeoAdmin):

    pass

@admin.register(County)
# class CountyAdmin(admin.OSMGeoAdmin):
class CountyAdmin(LeafletGeoAdmin):

    pass