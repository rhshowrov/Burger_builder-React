from rest_framework.decorators import api_view,authentication_classes, permission_classes
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
# Create your views here.


@api_view(['POST'])
@authentication_classes([])  # Override global authentication settings
@permission_classes([AllowAny])  # Allows anyone to access this view
def UserView(request):
    if request.method=="POST":
        username=request.data.get('username')
        password=request.data.get('password')
        #authentication of user
        user=authenticate(username=username,password=password)
        
        if user is not None:
            refresh=RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },status=status.HTTP_200_OK)
        return Response({'error':"Invalid Credential"},status=status.HTTP_401_UNAUTHORIZED)
    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['POST'])
@authentication_classes([])  # Override global authentication settings
@permission_classes([AllowAny]) 
def userRegistrationView(request):
    username=request.data.get('username')
    email=request.data.get('email')
    password=request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({"error":"Username already exist!!"},status=status.HTTP_400_BAD_REQUEST) #status code is needed always 
    if User.objects.filter(email=email).exists():
        return Response({"error":"Email already exist!!"},status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"success": "Registration Successful"}, status=status.HTTP_201_CREATED)  # ✅ Success Code (201 Created)
    except Exception as e:
        return Response({"error": f"Unknown Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  # ✅ Internal Server Error
