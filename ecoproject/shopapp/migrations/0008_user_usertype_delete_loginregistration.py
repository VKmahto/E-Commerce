# Generated by Django 4.2.17 on 2025-01-20 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopapp', '0007_loginregistration'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('emp_id', models.BigIntegerField(null=True)),
                ('emp_code', models.CharField(max_length=12, null=True)),
                ('contact_no', models.CharField(max_length=12, null=True)),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=12)),
                ('email', models.CharField(max_length=100, null=True)),
                ('status', models.IntegerField(default=1)),
                ('ip', models.CharField(max_length=200, null=True)),
                ('stampdate_time', models.CharField(max_length=100)),
                ('update_pswd', models.IntegerField(default=0)),
            ],
            options={
                'db_table': 'tbl_user_mstr',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='UserType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('user_type_name', models.CharField(max_length=100)),
                ('role_description', models.CharField(blank=True, max_length=500, null=True)),
                ('user_id', models.BigIntegerField()),
                ('stampdate_time', models.CharField(max_length=100)),
                ('status', models.IntegerField(default=1)),
            ],
            options={
                'db_table': 'tbl_user_type',
                'managed': True,
            },
        ),
        migrations.DeleteModel(
            name='LoginRegistration',
        ),
    ]
