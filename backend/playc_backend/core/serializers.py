from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import MainUser, UserRol, EstadosCancha, CategoriasCancha, Canchas, Empleados, HorariosReserva, EstadosReserva, ReservasCanchas
from rest_framework.exceptions import ValidationError

class UserRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRol
        fields = '__all__'

class MainUserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    rol = UserRolSerializer(read_only=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=UserRol.objects.all(), source='rol', write_only=True
    )

    class Meta:
        model = MainUser
        fields = ('id', 'name', 'lastname', 'email', 'rol', 'rol_id', 'gender', 'password')

    def create(self, validated_data):
        # Aquí usamos create_user para que Django maneje password e is_active
        user = MainUser.objects.create_user(
            # el id se creo automaticamente
            username=validated_data['email'],  # username = email
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
            lastname=validated_data.get('lastname', ''),
            rol=validated_data.get('rol', None),
            gender=validated_data.get('gender', ''),
            is_active=True
        )
        return user
    
class UserUpdateSerializer(serializers.ModelSerializer):
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=UserRol.objects.all(), source='rol', write_only=True
    )
    
    class Meta:
        model = MainUser
        fields = ['id', 'name', 'lastname', 'email', 'gender', 'rol_id', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)  # Saca el campo si viene
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:  # Solo cambia si viene con valor
            instance.set_password(password)
        
        instance.save()
        return instance
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Cambiamos username_field a email
    username_field = 'email'

    def validate(self, attrs):
        # attrs contendrá 'email' y 'password' si envías correctamente desde el frontend
        email = attrs.get("email")
        password = attrs.get("password")

        if email is None or password is None:
            raise serializers.ValidationError("Debes enviar email y password")

        try:
            user = MainUser.objects.get(email=email)
        except MainUser.DoesNotExist:
            raise serializers.ValidationError("Correo o contraseña incorrectos")

        if not user.check_password(password):
            raise serializers.ValidationError("Correo o contraseña incorrectos")

        # IMPORTANTE: pasar al serializer padre lo que espera: el campo definido en username_field
        return super().validate({self.username_field: email, "password": password})

class EstadosCanchaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadosCancha
        fields = '__all__'

class CategoriasCanchaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriasCancha
        fields = '__all__'

class EstadosCanchaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadosCancha
        fields = '__all__'

class CanchasSerializer(serializers.ModelSerializer):
    categoria_cancha = CategoriasCanchaSerializer(read_only=True)
    categoria_cancha_id = serializers.PrimaryKeyRelatedField(
        queryset=CategoriasCancha.objects.all(), source='categoria_cancha', write_only=True
    )

    estado_cancha = EstadosCanchaSerializer(read_only=True)
    estado_cancha_id = serializers.PrimaryKeyRelatedField(
        queryset=EstadosCancha.objects.all(), source='estado_cancha', write_only=True
    )

    usuario = MainUserCreateSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=MainUser.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Canchas
        fields = '__all__'

    def validate(self, attrs):
        nombre = attrs.get('cancha_nombre') or getattr(self.instance, 'cancha_nombre', None)
        numero = attrs.get('cancha_numero') or getattr(self.instance, 'cancha_numero', None)

        # Armamos queryset base
        qs = Canchas.objects.filter(cancha_nombre=nombre, cancha_numero=numero)

        # Si estamos editando, excluir la instancia actual
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        if qs.exists():
            raise serializers.ValidationError({
                "non_field_errors": [
                    "Ya existe una cancha deportiva con el mismo nombre y número."
                ]
            })

        return attrs

class EmpleadosSerializer(serializers.ModelSerializer):
    usuario = MainUserCreateSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=MainUser.objects.all(), source='usuario', write_only=True
    )

    class Meta:
        model = Empleados
        fields = '__all__'

class HorariosReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorariosReserva
        fields = '__all__'

class EstadosReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadosReserva
        fields = '__all__'

class ReservasCanchaSerializer(serializers.ModelSerializer):
    cancha_deportiva = CanchasSerializer(read_only=True)
    cancha_deportiva_id = serializers.PrimaryKeyRelatedField(
        queryset=Canchas.objects.all(), source='cancha_deportiva', write_only=True
    )

    horario_reserva = HorariosReservaSerializer(read_only=True)
    horario_reserva_id = serializers.PrimaryKeyRelatedField(
        queryset=HorariosReserva.objects.all(), source='horario_reserva', write_only=True
    )

    estado_reserva = EstadosReservaSerializer(read_only=True)
    estado_reserva_id = serializers.PrimaryKeyRelatedField(
        queryset=EstadosReserva.objects.all(), source='estado_reserva', write_only=True
    )

    usuario = MainUserCreateSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=MainUser.objects.all(), source='usuario', write_only=True, allow_null=True,
    )

    class Meta:
        model = ReservasCanchas
        fields = '__all__'
        
    def validate(self, data):
        cancha = data.get("cancha_deportiva", getattr(self.instance, "cancha_deportiva", None))
        fecha = data.get("reserva_fecha", getattr(self.instance, "reserva_fecha", None))
        horario = data.get("horario_reserva", getattr(self.instance, "horario_reserva", None))

        qs = ReservasCanchas.objects.filter(cancha_deportiva=cancha, reserva_fecha=fecha, horario_reserva=horario)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise ValidationError({
                "detail": "Ya existe una reserva para esta cancha, fecha y horario seleccionados"
            })

        return data