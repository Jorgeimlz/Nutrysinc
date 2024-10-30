# backend/users/models.py
from django.db import models

class UserProfile(models.Model):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    height = models.DecimalField(max_digits=4, decimal_places=1)
    weight = models.DecimalField(max_digits=5, decimal_places=1)
    birth_date = models.DateField()
    goal = models.CharField(max_length=255)
    dietary_preferences = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    
    def __str__(self):
        return self.username
