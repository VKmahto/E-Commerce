from django.db import models

# Create your models here.

class LoginRegistration (models.Model):
    id                 = models.AutoField(primary_key=True)
    username           = models.CharField(max_length=50, null=False)
    firstname          = models.CharField(max_length=50, null=False)
    lastname           = models.CharField(max_length=50, null=False)
    password           = models.CharField(max_length=50, null=False)
    confirm_password   = models.CharField(max_length=50, null=False)
    datetime           = models.DateTimeField(auto_now_add=True, null=False)
    status             = models.IntegerField(default=1)

    class Meta:
        db_table = 'tbl_login_registration'
        managed = True
        verbose_name = 'LoginRegistration'
        verbose_name_plural = 'LoginRegistration'

class Category(models.Model):
    id                 = models.AutoField(primary_key=True)
    name               = models.CharField(max_length=100, null=False)
    description        = models.CharField(max_length=100, null=False)
    username           = models.CharField(max_length=30, null=False)
    datetime           = models.DateTimeField(auto_now_add=True, null=False)
    status             = models.IntegerField(default=1)

    class Meta:
        db_table = 'tbl_category'
        managed = True
        verbose_name = 'Category'
        verbose_name_plural = 'Category'


class Product(models.Model):
    id          = models.AutoField(primary_key=True)
    name        = models.CharField(max_length=100)
    image       = models.ImageField(upload_to="img/")
    description = models.TextField(blank=True,null=True)
    price       = models.DecimalField(max_digits=10, decimal_places=2)
    category    = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE)
    status      = models.IntegerField(default=1)
    username    = models.CharField(max_length=30, null=True)
    datetime    = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'tbl_product'
        managed = True
        verbose_name = 'Product'
        verbose_name_plural = 'Product'
    
    

   