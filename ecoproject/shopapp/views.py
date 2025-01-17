from django.shortcuts import render
from rest_framework.decorators import api_view  
from .models import Product,Category
from .serializers import ProductSerializer,CategorySerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(["GET", "POST", "PUT"])
def category(request):
    print('skfjasgfigas')
    if request.method == "GET":
        print('gettttttttttttttttttttttt')
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        print('POSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOSTPOST ')
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        try:
            category = Category.objects.get(id=request.data["id"])  
        except Category.DoesNotExist:
            return Response({"detail": "Category not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def product_alter(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



    
  