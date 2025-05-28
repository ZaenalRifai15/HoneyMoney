from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    TRANSACTION_TYPE = (
        ('income', 'Pemasukan'),
        ('expense', 'Pengeluaran'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_TYPE)
    description = models.CharField(max_length=255, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.amount}"

class Investment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    principal = models.DecimalField(max_digits=12, decimal_places=2)  # uang yang diinvestasikan
    rate = models.FloatField()  # persentase pendapatan per bulan (misal: 5 untuk 5%)
    months = models.PositiveIntegerField()  # lama investasi dalam bulan
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total(self):
        # Simple interest calculation
        return self.principal * (1 + (self.rate/100) * self.months)

    def __str__(self):
        return f"{self.user.username} - Investasi {self.principal} ({self.rate}%/{self.months} bln)"