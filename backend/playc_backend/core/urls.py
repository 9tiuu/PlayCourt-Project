from django.urls import path
from .views import CreateUsersView, UserDetailView, CreateUserRolView, EmpleadosCreateView, EmpleadosDetailView  # tu vista de crear usuarios
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, CurrentUserView, CategoriasCanchaView, EstadosCanchaView, CanchasView, CanchasDetailView, HorariosReservaCreateView, HorariosReservaDetailView, EstadosReservaCreateView, EstadosReservaDetailView, ReservasCanchasCreateView, ReservasCanchasDetailView

urlpatterns = [
    path('users/', CreateUsersView.as_view(), name='users'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='users_details'),
    path('roles/', CreateUserRolView.as_view(), name='roles'),
    path('estadoscanchas/', EstadosCanchaView.as_view(), name='estados_canchas'),
    path('categoriascancha/', CategoriasCanchaView.as_view(), name='categorias_canchas'),
    path('canchasdeportivas/', CanchasView.as_view(), name='canchas'),
    path('canchasdeportivas/<int:pk>/', CanchasDetailView.as_view(), name='canchas_details'),
    path('empleados/', EmpleadosCreateView.as_view(), name='empleados'),
    path('empleados/<int:pk>/', EmpleadosDetailView.as_view(), name='empleados_details'),
    path('horariosreserva/', HorariosReservaCreateView.as_view(), name='horarios_reserva'),
    path('horariosreserva/<int:pk>/', HorariosReservaDetailView.as_view(), name='horarios_reserva_details'),
    path('estadosreserva/', EstadosReservaCreateView.as_view(), name='estados_reservas'),
    path('estadosreserva/<int:pk>/', EstadosReservaDetailView.as_view(), name='estados_reservas_details'),
    path('reservascanchas/', ReservasCanchasCreateView.as_view(), name='reservas_canchas'),
    path('reservascanchas/<int:pk>/', ReservasCanchasDetailView.as_view(), name='reservas_canchas_details'),

    path("me/", CurrentUserView.as_view(), name="current_user"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]