from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import MainUser, UserRol

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
        fields = ('name', 'lastname', 'email', 'rol', 'rol_id', 'gender', 'password')

    def create(self, validated_data):
        # Aquí usamos create_user para que Django maneje password e is_active
        user = MainUser.objects.create_user(
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
