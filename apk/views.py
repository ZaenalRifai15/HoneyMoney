from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, permissions
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class TransactionListCreate(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer  # Gunakan nama serializer baru
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print("User yang login:", self.request.user)
        return Transaction.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        print("user yang menyimpan transaksi:", self.request.user)
        serializer.save(user=self.request.user)

    def post(self, request, *args, **kwargs):
        print("Request data:", request.data)  # Debugging
        response = super().post(request, *args, **kwargs)
        print("Response data:", response.data)  # Tambahkan ini
        return response
    
    def post(self, request, *args, **kwargs):
        print("Request data:", request.data)  # Debugging
        response = super().post(request, *args, **kwargs)
        print("Response data:", response.data)  # Tambahkan ini
        return response


class InvestmentListCreate(generics.ListCreateAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Investment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@method_decorator(csrf_exempt, name='dispatch')
class RegisterUser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        print("Received registration request:", request.data)   
        username = request.data.get('username')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            print("Username sudah terdaftar:", username)  # Debugging
            return Response({'error': 'Username sudah terdaftar'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'User berhasil didaftarkan'}, status=status.HTTP_201_CREATED)
    
def index (request):
    data = {
        "message": "Hello from the Django backend!"
    }
    return JsonResponse(data)

