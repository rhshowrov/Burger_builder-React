from django.urls import path
from .views import order_list,create_order
urlpatterns=[
    path('list/',order_list,name="order_list"),
    path('save_order/',create_order,name="save_order"),
   

]