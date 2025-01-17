from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify

# Create your models here.
class CustomUser(AbstractUser):
    city    = models.CharField(max_length=100)
    state   = models.CharField(max_length=100)
    address = models.CharField(max_length=100) 
    phone   = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
