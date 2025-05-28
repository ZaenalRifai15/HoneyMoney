from rest_framework import serializers
from .models import Transaction, Investment
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print("Token dibuat untuk user:", user.username)  # Debugging
        token['username'] = user.username
        return token
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class InvestmentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Investment
        fields = ['id', 'user', 'principal', 'rate', 'months', 'created_at']
