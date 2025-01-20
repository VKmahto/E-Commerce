from django.shortcuts import render,HttpResponse,get_object_or_404
from rest_framework.decorators import api_view  
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status

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

@api_view(["GET", "POST","PATCH"])
def student(request):

    if request.method == "GET":    
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "PATCH":
        student_id = request.data.get("id")
        student_instance = Student.objects.get(id=student_id)
        serializer = StudentSerializer(student_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET", "PATCH"])
def student_id(request, id):
    student_instance = Student.objects.get(id=id)
    if request.method == "GET":
        serializer = StudentSerializer(student_instance)
        return Response(serializer.data)

    elif request.method == "PATCH":
        serializer = StudentSerializer(student_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
