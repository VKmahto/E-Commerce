# Generated by Django 4.2.17 on 2025-01-16 10:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0002_alter_product_options_remove_product_slug_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=1)),
                ('description', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=30)),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(default=1)),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Category',
                'db_table': 'tbl_category',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='product',
            name='status',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='shopapp.category'),
        ),
    ]