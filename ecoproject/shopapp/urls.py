from django.urls import path
from . import views

urlpatterns = [
    path('api/category/', views.category, name='category'),
    path('api/product/', views.product, name='product'),
]

