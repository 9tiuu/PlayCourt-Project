# from django.shortcuts import render
from .permissions import IsAdminRole
from rest_framework import generics
from .models import MainUser, UserRol, EstadosCancha, CategoriasCancha, Canchas, Empleados, HorariosReserva, EstadosReserva, ReservasCanchas
from .serializers import MainUserCreateSerializer, UserUpdateSerializer, UserRolSerializer, MyTokenObtainPairSerializer, EstadosCanchaSerializer, CategoriasCanchaSerializer, CanchasSerializer, EmpleadosSerializer, HorariosReservaSerializer, EstadosReservaSerializer, ReservasCanchaSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from core.permissions import IsAdminRole

class CreateUserRolView(generics.ListCreateAPIView):
    queryset = UserRol.objects.all()
    serializer_class = UserRolSerializer

class CreateUsersView(generics.ListCreateAPIView):
    queryset = MainUser.objects.all()
    serializer_class = MainUserCreateSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MainUser.objects.all()
    serializer_class = UserUpdateSerializer
    # permission_classes = [IsAuthenticated, IsAdminRole]

class EstadosCanchaView(generics.ListCreateAPIView):
    queryset = EstadosCancha.objects.all()
    serializer_class = EstadosCanchaSerializer
    # permission_classes = [IsAuthenticated, IsAdminRole]

class CategoriasCanchaView(generics.ListCreateAPIView):
    queryset = CategoriasCancha.objects.all()
    serializer_class = CategoriasCanchaSerializer

class CanchasView(generics.ListCreateAPIView):
    queryset = Canchas.objects.all()
    serializer_class = CanchasSerializer

class CanchasDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Canchas.objects.all()
    serializer_class = CanchasSerializer

class EmpleadosCreateView(generics.ListCreateAPIView):
    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer

class EmpleadosDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleados.objects.all()
    serializer_class = EmpleadosSerializer

class HorariosReservaCreateView(generics.ListCreateAPIView):
    queryset = HorariosReserva.objects.all()
    serializer_class = HorariosReservaSerializer

class HorariosReservaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HorariosReserva.objects.all()
    serializer_class = HorariosReservaSerializer

class EstadosReservaCreateView(generics.ListCreateAPIView):
    queryset = EstadosReserva.objects.all()
    serializer_class = EstadosReservaSerializer

class EstadosReservaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EstadosReserva.objects.all()
    serializer_class = EstadosReservaSerializer

class ReservasCanchasCreateView(generics.ListCreateAPIView):
    queryset = ReservasCanchas.objects.all()
    serializer_class = ReservasCanchaSerializer

class ReservasCanchasDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ReservasCanchas.objects.all()
    serializer_class = ReservasCanchaSerializer

# --------------------------------------------------------------------------------------- #

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"detail": "Email y contraseña son requeridos"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = MainUser.objects.get(email=email)
        except MainUser.DoesNotExist:
            return Response(
                {"detail": "Correo y/o contraseña incorrectos"}, status=status.HTTP_404_NOT_FOUND
            )

        if not user.check_password(password): 
            return Response(
                {"detail": "Correo y/o contraseña incorrectos"}, status=status.HTTP_401_UNAUTHORIZED
            )

        # Si todo está correcto, generamos el token con el serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
# --------------------------------------------------------------------------------------- #

class CurrentUserView(APIView):
    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = MainUserCreateSerializer(request.user)
        return Response(serializer.data)