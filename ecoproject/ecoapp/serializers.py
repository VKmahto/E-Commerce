from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'city', 'state', 'address', 'phone']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Student
        fields = '__all__'
