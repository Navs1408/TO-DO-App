from django.urls import path
from . import views

urlpatterns = [
    path('register/',       views.register),
    path('login/',          views.login),
    path('users/',          views.user_list),
    path('todos/',          views.todo_list),
    path('todos/<int:pk>/', views.todo_detail),
]