# Generated by Django 4.2.17 on 2025-01-20 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecoapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('date_of_birth', models.DateField()),
                ('grade', models.IntegerField()),
                ('phone', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
            ],
        ),
    ]