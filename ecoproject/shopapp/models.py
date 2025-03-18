# Create your models here.
from django.db import models

class UserType(models.Model):
    objects          = models.Manager()
    id               = models.AutoField(primary_key=True)
    user_type_name   = models.CharField(max_length=100,null=False)
    role_description = models.CharField(max_length=500,null=True,blank=True)
    user_id          = models.BigIntegerField(null=False)
    stampdate_time   = models.CharField(max_length=100,null=False)
    status           = models.IntegerField(default=1,null=False)
    class Meta:
        db_table='tbl_user_type'
        managed = True

    # def get_absolute_url(self):
    #     return '/system/role/{0}/'.format(cipher.encrypt(self.id))

    # def get_edit_url(self):
    #     return '/system/role/{}/{}/'.format('Update',cipher.encrypt(self.id))
        
    # def get_view_url(self):
    #     return '/system/role/{}/{}/'.format('Close',cipher.encrypt(self.id))

    def __str__(self):
        return self.user_type_name 


class User(models.Model):
    objects    = models.Manager()
    id         = models.AutoField(primary_key=True)
    name       = models.CharField(max_length=100,null=False)
    emp_id     = models.BigIntegerField(null=True)
    emp_code   = models.CharField(max_length=12,null=True)
    contact_no = models.CharField(max_length=12,null=True)
    username   = models.CharField(max_length=100,null=False)
    password   = models.CharField(max_length=12,null=False)
    # role        = models.ForeignKey('UserType',on_delete=models.CASCADE,null=False,blank=False)
    email      = models.CharField(max_length=100,null=True)
    status     = models.IntegerField(default=1)
    ip         = models.CharField(max_length=200,null=True)
    stampdate_time = models.CharField(max_length=100,null=False)
    update_pswd    = models.IntegerField(null=False,default=0)
    class Meta:
        db_table='tbl_user_mstr'  
        managed = True

    def __str__(self):
        return self.name

class Category(models.Model):
    objects = models.Manager()
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
    objects     = models.Manager()
    id          = models.AutoField(primary_key=True)
    name        = models.CharField(max_length=100)
    # image       = models.ImageField(upload_to="img/")
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
    
class ProductImage(models.Model):
    objects = models.Manager()
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="img/")
    status = models.IntegerField(default=1)
    username = models.CharField(max_length=30, null=True)
    datetime = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        db_table = 'tbl_product_image'
        managed = True
        verbose_name = 'Product Image'
        verbose_name_plural = 'Product Image'



   