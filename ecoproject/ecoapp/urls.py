from django.urls import path
from . import views

urlpatterns = [
    path('customuser/', views.customuser, name='customuser'),
    path('customuser/create/',views.custom_create,name ='custom_create'),
    path('student/', views.student, name="student"),
    path('student/<int:id>/', views.student_id, name="student_detail"),
]
