from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Order
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.
@api_view(["GET"])  # Use GET for retrieving data
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])  
def order_list(request):  # Function names should be lowercase with underscores (PEP8)
    user = request.user  # Get the authenticated user
    orders = Order.objects.filter(user=user)  # Fetch orders belonging to this user
    data = OrderSerializer(orders, many=True).data  # Serialize data
    return Response({"user": str(user), "orders": data})



@api_view(["POST"])  # Allows only POST requests to create an order
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])  
def create_order(request):
    user = request.user  # Get the authenticated user
    data = request.data  # Get data from request body (JSON input)

    # Include the user in the data before validation
    order_data = {
        "user": user.id,  # Assign the user ID (FK field expects an ID)
        "salad_count": data.get("salad_count", 0),
        "cheese_count": data.get("cheese_count", 0),
        "meat_count": data.get("meat_count", 0),
        "total_price": data.get("total_price", 0),
        "delivery_address": data.get("delivery_address"),
        "pay_method": data.get("pay_method"),
        "mobile_no": data.get("mobile_no"),
        "order_status": "Processing",  # Default status
    }

    serializer = OrderSerializer(data=order_data)  # Pass the data to serializer

    if serializer.is_valid():  # Validate the input
        serializer.save()  # Save the order in the database
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors
