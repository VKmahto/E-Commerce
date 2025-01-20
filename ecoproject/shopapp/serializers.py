from rest_framework import serializers
from .models import Product, Category , LoginRegistration

class LoginRegistrationSerializer(serializers. ModelSerializer):
   class Meta:
    model = LoginRegistration
    fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
      model = Product
      fields = '__all__'
      