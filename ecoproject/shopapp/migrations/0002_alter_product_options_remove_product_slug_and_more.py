# Generated by Django 4.2.17 on 2025-01-16 09:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'managed': True, 'verbose_name': 'Product', 'verbose_name_plural': 'Product'},
        ),
        migrations.RemoveField(
            model_name='product',
            name='slug',
        ),
        migrations.AlterModelTable(
            name='product',
            table='tbl_product',
        ),
    ]