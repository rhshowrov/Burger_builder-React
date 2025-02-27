from django.urls import include,path
from .views import UserView,userRegistrationView
urlpatterns=[
    path('login/',UserView,name="login"),
    path('signup/',userRegistrationView,name="signup"),

]