from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class UserRol(models.Model):
    namerol = models.CharField(max_length=50, null=True, blank=True, unique=True)

    def __str__(self):
        return f'{self.namerol}'


class MainUser(AbstractUser):
    name = models.CharField(max_length=50, null=True, blank=True)
    lastname = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    rol = models.ForeignKey(UserRol, on_delete=models.SET_NULL, null=True, blank=True)
    gender = models.CharField(max_length=50, blank=True)

    REQUIRED_FIELDS = ['name', 'lastname']  # necesario si cambias username
    USERNAME_FIELD = 'email' 

    def __str__(self):
        return f'{self.name} {self.lastname} {self.rut}'