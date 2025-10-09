from django.urls import path
from .views import CreateUsersView, CreateUserRolView  # tu vista de crear usuarios
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, CurrentUserView, CategoriasCanchaView, EstadosCanchaView, CanchasView, CanchasDetailView

urlpatterns = [
    path('users/', CreateUsersView.as_view(), name='users'),
    path('roles/', CreateUserRolView.as_view(), name='roles'),
    path('estadoscanchas/', EstadosCanchaView.as_view(), name='estados_canchas'),
    path('categoriascancha/', CategoriasCanchaView.as_view(), name='categorias_canchas'),
    path('canchasdeportivas/', CanchasView.as_view(), name='canchas'),
    path('canchasdeportivas/<int:pk>/', CanchasDetailView.as_view(), name='canchas_details'),

    path("me/", CurrentUserView.as_view(), name="current_user"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]