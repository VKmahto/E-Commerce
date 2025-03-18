from django.shortcuts import render
from rest_framework.decorators import api_view , APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
# from django.contrib.auth import check_password
from django.contrib.auth.hashers import check_password
from .models import *
import random
import socket
from django.utils.timezone import now
import razorpay
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


class UserRegistrationView(APIView):
    def generate_emp_code(self):
        return f"EMP{random.randint(100000, 999999)}"

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def get(self, request):
        return Response({"message": "This is the registration endpoint. Please use POST to register a new user."}, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data.copy()  
        data['emp_id'] = None
        data['emp_code'] = self.generate_emp_code()
        data['ip'] = self.get_client_ip(request)
        data['stampdate_time'] = now().strftime('%Y-%m-%d %H:%M:%S')

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def get(self, request):
        return Response({"message": "This is the Login endpoint. Please use POST to Login a new user."}, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            try:
                user = User.objects.get(username=username)
                if check_password(password, user.password):
                    token, _ = Token.objects.get_or_create(user=user)
                    return Response({
                        "token": token.key,
                        "user_id": user.id,
                        "username": user.username
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET", "POST", "PUT"])
def category(request):
    if request.method == "GET":
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
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

@api_view(["GET", "POST", "PUT"])
def product(request):
    if request.method == "GET":
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        product_serializer = ProductSerializer(data=request.data)
        
        if product_serializer.is_valid():
            product = product_serializer.save()

            # Handle multiple images for ProductImage
            images = request.FILES.getlist('images')  # Expecting 'images' as a list in form-data
            for img in images:
                ProductImage.objects.create(
                    product=product,
                    image=img,
                    status=request.data.get('status', 1),
                    username=request.data.get('username', None)
                )
            return Response(product_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "PUT":
        try:
            product = Product.objects.get(id=request.data["id"])
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update product details including image if provided
        product_serializer = ProductSerializer(product, data=request.data, partial=True)
        if product_serializer.is_valid():
            product_serializer.save()

            # Optional: Handle new images for ProductImage (if provided)
            new_images = request.FILES.getlist('images')
            for img in new_images:
                ProductImage.objects.create(
                    product=product,
                    image=img,
                    status=request.data.get('status', 1),
                    username=request.data.get('username', None)
                )
            return Response(product_serializer.data, status=status.HTTP_200_OK)
        
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def product_images(request, product_id):
    try:
        images = ProductImage.objects.filter(product_id=product_id)
        serializer = ProductImageSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except ProductImage.DoesNotExist:
        return Response({"error": "Images not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def productviewdtls(request, id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)
    

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        data = json.loads(request.body)
        amount = int(data.get("amount")) * 100  # Razorpay expects amount in paise

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        payment = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": "1"
        })

        return JsonResponse({"order_id": payment["id"], "amount": payment["amount"]})
