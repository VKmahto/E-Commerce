# Generated by Django 4.2.17 on 2025-01-16 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0003_category_product_status_alter_product_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='datetime',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='username',
            field=models.CharField(max_length=30, null=True),
        ),
    ]