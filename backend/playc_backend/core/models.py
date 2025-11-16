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
    cancha_precio = models.IntegerField()
    categoria_cancha = models.ForeignKey(CategoriasCancha, on_delete=models.SET_NULL, null=True, blank=True)
    estado_cancha = models.ForeignKey(EstadosCancha, on_delete=models.SET_NULL, null=True, blank=True)
    usuario = models.ForeignKey(MainUser, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.cancha_nombre} - Nº{self.cancha_numero} '

class Empleados(models.Model):
    # empleado_id se crea automaticamente
    nombre = models.CharField(max_length=50, null=True, blank=True)
    segundo_nombre = models.CharField(max_length=50, null=True, blank=True)
    apellido_paterno = models.CharField(max_length=50, null=True, blank=True)
    apellido_materno = models.CharField(max_length=50, null=True, blank=True)
    edad = models.IntegerField()
    genero = models.CharField(max_length=50, null=True, blank=True)
    cargo = models.CharField(max_length=50, null=True, blank=True)
    jornada = models.CharField(max_length=50, null=True, blank=True) # EJ: 09:00 - 18:00
    correo = models.EmailField(unique=True)
    celular = models.CharField(max_length=50, null=True, blank=True)
    rut = models.CharField(max_length=50, null=True, blank=True)
    fecha_ingreso = models.DateField(auto_now=False, auto_now_add=False) # yyyy-mm-dd
    tipo_contrato = models.CharField(max_length=50, null=True, blank=True)
    sueldo =  models.IntegerField()
    usuario = models.ForeignKey(MainUser, on_delete=models.SET_NULL, null=True, blank=True)

class HorariosReserva(models.Model):
    # horario_reserva_id se crea automaticamente
    horario_reserva_hora = models.TimeField(null=True, blank=True) # null y vacios temporales
    horario_reserva_termino = models.TimeField(null=True, blank=True) # null y vacios temporales
    horario_reserva_expiracion = models.TimeField(null=True, blank=True) # null y vacios temporales

    def __str__(self):
        return f'{self.horario_reserva_hora} - {self.horario_reserva_termino}'

class EstadosReserva(models.Model):
    # estado_reserva_id se crea automaticamente
    estado_reserva_nombre = models.CharField(max_length=50, null=True, blank=True, unique=True)

    def __str__(self):
        return f'{self.estado_reserva_nombre}'

class ReservasCanchas(models.Model):
    # reserva_id se crea automatico
    nombre_cliente = models.CharField(max_length=50, null=True, blank=True)
    apellido_cliente = models.CharField(max_length=50, null=True, blank=True)
    correo_cliente = models.CharField(max_length=50, null=True, blank=True)
    cancha_deportiva = models.ForeignKey(Canchas, on_delete=models.SET_NULL, null=True, blank=True)
    reserva_precio = models.IntegerField()
    reserva_fecha = models.DateField(null=True, blank=True) # null y vacios temporales
    horario_reserva = models.ForeignKey(HorariosReserva, on_delete=models.SET_NULL, null=True, blank=True)
    estado_reserva = models.ForeignKey(EstadosReserva, on_delete=models.SET_NULL, null=True, blank=True)
    usuario = models.ForeignKey(MainUser, on_delete=models.SET_NULL, null=True, blank=True)
