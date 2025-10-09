from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class UserRol(models.Model):
    namerol = models.CharField(max_length=50, null=True, blank=True, unique=True)

    def __str__(self):
        return f'{self.namerol}'

class MainUser(AbstractUser):
    # el id se creo automaticamente
    name = models.CharField(max_length=50, null=True, blank=True)
    lastname = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True)
    rol = models.ForeignKey(UserRol, on_delete=models.SET_NULL, null=True, blank=True)
    gender = models.CharField(max_length=50, blank=True)

    REQUIRED_FIELDS = ['name', 'lastname']  # necesario si cambias username
    USERNAME_FIELD = 'email' 

    def __str__(self):
        return f'{self.name} {self.lastname}'
    
class EstadosCancha(models.Model):
    # estado_cancha_id se crea automaticamente
    estado_cancha_nombre = models.CharField(max_length=50, null=True, blank=True, unique=True)

    def __str__(self):
        return f'{self.estado_cancha_nombre}'

class CategoriasCancha(models.Model):
    # categoria_cancha_id se crea automaticamente
    categoria_cancha_nombre = models.CharField(max_length=50, null=True, blank=True, unique=True)

    def __str__(self):
        return f'{self.categoria_cancha_nombre}'
    
class Canchas(models.Model):
    # cancha_id se crea automaticamente
    cancha_numero = models.IntegerField()
    cancha_nombre = models.CharField(max_length=50)
    cancha_dimension = models.CharField(max_length=50)
    categoria_cancha = models.ForeignKey(CategoriasCancha, on_delete=models.SET_NULL, null=True, blank=True)
    estado_cancha = models.ForeignKey(EstadosCancha, on_delete=models.SET_NULL, null=True, blank=True)
    usuario = models.ForeignKey(MainUser, on_delete=models.SET_NULL, null=True, blank=True)
