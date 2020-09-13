from django.urls import path
from django.urls import include
from uploadapp import views
from .views import *
urlpatterns = [

    path('file', FileUploadView.as_view()),
path('columns', columns.as_view()),

]
