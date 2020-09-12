from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from .models import DataSet
from .serializers import DataSetSerializer

# Create your views here.

class FileUploadView(APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_serializer = DataSetSerializer(data=request.data)
        if file_serializer.is_valid() :
            file_serializer.save()
            return Response( file_serializer.data, status=status.HTTP_201_CREATED )
        else :
            return Response( file_serializer.errors, status=status.HTTP_400_BAD_REQUEST )