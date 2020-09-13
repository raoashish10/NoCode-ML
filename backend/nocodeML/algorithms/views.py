from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from uploadapp.models import DataSet
import pandas as pd

# Create your views here.
@api_view(['POST'])
def algotype(request):
    choice=request.POST['choice'] #Type of algo
    return Response(data={'choice':choice})

@api_view(['POST'])
def algochoose(request):
    choice=request.POST['choice']
    algo=request.POST['algo'] #Algo chosen from list of algos of one type
    
