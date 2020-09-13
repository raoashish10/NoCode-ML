from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.response import Response
from .models import DataSet
from .serializers import DataSetSerializer
import pandas as pd
# Create your views here.

class FileUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        print(request)
        if request.FILES:
            print('nice')
        file_serializer = DataSetSerializer(data=request.data)
        file = request.FILES['file']
        data = DataSet.objects.create( data=file )
        return Response(status=status.HTTP_201_CREATED )
        # if file_serializer.is_valid() :
        #     file=request.FILES['file']
        #     data=DataSet.objects.create(data=file)
        #     return Response( file_serializer.data, status=status.HTTP_201_CREATED )
        # else :
        #     return Response( file_serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    # def get(self,request, *args, **kwargs):
    #     filename=DataSet.objects.latest('id').data.name
    #     df=pd.read_csv('media/'+filename)
    #     df_json=dict()
    #     df=df.fillna(' ')
    #     for i in df.columns:
    #         df_json[i]=df[i].iloc[:]
    #     return Response(data=df_json)
class columns(APIView):
    parser_classes = (MultiPartParser,)

    def post(self,request,*args,**kwargs):
        target=request.POST['target']
        ignored=request.POST['ignored'][1:-1]
        ignored=ignored.split(',')
        # ignored=ignored.split(',')
        filename=DataSet.objects.latest('id').data.name
        df=pd.read_csv('media/'+filename)
        for i in range(len(ignored)):
            char=ignored[i]
            if char=='1':
                df.rename(columns={df.columns[i]:'_ignored_'},inplace=True)

        df.drop(['_ignored_'],axis=1,inplace=True)

        cols=df.columns.tolist()

        cols.remove(target)
        cols.append(target)

        df=df[cols]
        df.to_csv('media/temp/df.csv')
        response=Response(status=200)
        response.set_cookie('df','df')
        return response
