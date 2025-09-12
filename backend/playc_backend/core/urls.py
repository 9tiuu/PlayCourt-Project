from django.urls import path
from .views import CreateUsersView, CreateUserRolView  # tu vista de crear usuarios
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, CurrentUserView

urlpatterns = [
    path('createusers/', CreateUsersView.as_view(), name='createusers'),
    path('createrol/', CreateUserRolView.as_view(), name='createrol'),
    path("me/", CurrentUserView.as_view(), name="current_user"),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]