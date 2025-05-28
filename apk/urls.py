from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('', views.index, name='index'),
    path('transactions/', views.TransactionListCreate.as_view(), name='transaction-list-create'),
    path('investments/', views.InvestmentListCreate.as_view(), name='investment-list-create'),
    path('register/', views.RegisterUser.as_view(), name='register-user'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    # Add more URL patterns as needed
]