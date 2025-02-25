from django.shortcuts import render
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
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


