from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('api/category/', views.category, name='category'),
    path('api/product/', views.product, name='product'),
    path('api/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/login/', UserLoginView.as_view(), name='user-login'),
    path('api/product/<int:id>/', views.productviewdtls, name='productviewdtls'),
    path('api/create-order/', views.create_order, name='create-order'),

]

