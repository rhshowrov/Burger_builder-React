from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.db import models
from django.core.validators import MinValueValidator, RegexValidator

class Order(models.Model):
    PAYMENT_METHODS = [
        ("Cash on Delivery", "Cash on Delivery"),
        ("Bkash", "Bkash"),
        ("Nagad", "Nagad"),
        ("Credit Card", "Credit Card"),
    ]

    ORDER_STATUSES = [
        ("Processing", "Processing"),
        ("Packing", "Packing"),
        ("Ready to Deliver", "Ready to Deliver"),
        ("Delivered", "Delivered"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="order")
    salad_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    cheese_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    meat_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    total_price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    delivery_address = models.TextField(blank=False)
    pay_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    mobile_no = models.CharField(
        max_length=11,
        validators=[
            RegexValidator(
                regex=r"^01[3-9]\d{8}$",
                message="Enter a valid Bangladeshi mobile number.",
            )
        ],
    )
    order_status = models.CharField(
        max_length=20, choices=ORDER_STATUSES, default="Processing"
    )
    order_created=models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} ordered {self.total_price} BDT worth of Burgers"


