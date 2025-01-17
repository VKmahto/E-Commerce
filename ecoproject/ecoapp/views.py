from django.shortcuts import render,HttpResponse
from rest_framework.decorators import api_view  
from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def customuser(request):
    customuser = CustomUser.objects.all()
    serializer = CustomUserSerializer(customuser, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def custom_create(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)