from django.urls import path, include
from gee.views import Home

urlpatterns = [
    path('', Home.as_view(), name='gee_home'),
]