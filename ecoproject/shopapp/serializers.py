from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model  = User
      fields = '__all__'
      extra_kwargs = {'password': {'write_only': True}}

      def create(self, validated_data):
          validated_data['password'] = make_password(validated_data.get('password'))
          return super(UserSerializer, self).create(validated_data)
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
      model = Product
      fields = '__all__'
      
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
      model = ProductImage
      fields = '__all__'