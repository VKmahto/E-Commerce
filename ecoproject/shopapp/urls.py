from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('api/category/', views.category, name='category'),
    path('api/product/', views.product, name='product'),
    path('api/product/<int:product_id>/images/', views.product_images, name='product_images'),
    path('api/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/login/', UserLoginView.as_view(), name='user-login'),
    path('api/product/<int:id>/', views.productviewdtls, name='productviewdtls'),
    path('api/create-order/', views.create_order, name='create-order'),
    path('api/chat/', views.chat_with_bot, name='chat_with_bot'),


]

