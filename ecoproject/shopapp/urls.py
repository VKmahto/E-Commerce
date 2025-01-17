from django.urls import path
from . import views

urlpatterns = [
    path('shopapp/api/category/', views.category, name='category'),
    path('product_list/', views.product_list, name='product_list'),
    path('product_alter/', views.product_alter, name='product_alter'), 
]
