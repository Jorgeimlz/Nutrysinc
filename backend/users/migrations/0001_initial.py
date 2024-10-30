# Generated by Django 5.1.2 on 2024-10-30 02:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('height', models.DecimalField(decimal_places=1, max_digits=4)),
                ('weight', models.DecimalField(decimal_places=1, max_digits=5)),
                ('birth_date', models.DateField()),
                ('goal', models.CharField(max_length=255)),
                ('dietary_preferences', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
    ]
