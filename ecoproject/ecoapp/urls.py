from django.urls import path
from . import views

urlpatterns = [
    path('customuser/', views.customuser, name='customuser'),
    path('customuser/create/',views.custom_create,name ='custom_create')
]
