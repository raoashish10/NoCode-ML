from django.urls import path
from django.urls import include
from uploadapp import views
from .views import *
urlpatterns = [
    path('', FileUploadView.as_view()),
    
]
