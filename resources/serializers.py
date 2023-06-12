from .models import Shop, CoffeeType
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeType
        fields =['name']


class ShopSerializer(GeoFeatureModelSerializer):
    type_of_coffee = TypeSerializer(many=True)

    class Meta:
        model = Shop
        geo_field = 'location'
        fields  = ('name', 'type_of_coffee', 'street_name')
        