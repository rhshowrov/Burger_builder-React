from django.urls import include,path
from .views import UserView
urlpatterns=[
    path('login/',UserView,name="login")
]