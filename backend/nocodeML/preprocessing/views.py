from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from uploadapp.models import DataSet
from .Data_Preprocessing import *
import pandas as pd

# Create your views here.
@api_view(['POST'])
def preprocessoption(request):
    auto_code=request.data['auto']
    featurescale=request.data['featurescale'] #Check
    label_encoder=request.data['label_enc']
    missing_val=request.data['missing_value']
    one_hot_encoder=request.data['one_hot']
    model=request.data['model']
    model_type=request.data['model_type']

    data=pd.read_csv('media/temp/'+request.POST.get('df','Salary_Data')+'.csv')# Replace with cookie['filename']
    data2=data
    x=data2.iloc[:,:-1]
    y=data2.iloc[:,-1]
    x.to_csv('media/temp/x.csv')
    y.to_csv('media/temp/y.csv')
    if auto_code=='True':
        x_train,x_test,y_train,y_test=auto(data=data2,model=model,model_type=model_type)
        x_train.to_csv('media/temp/x_train.csv')
        print(x_train.shape)
        x_test.to_csv('media/temp/x_test.csv')
        print( x_test.shape )
        y_train.to_csv('media/temp/y_train.csv')
        print( y_train.shape )
        y_test.to_csv('media/temp/y_test.csv')
        print(y_test.shape )
        processedx=pd.concat([x_train,x_test])
        print( processedx.shape )
        processedy=pd.concat([y_train,y_test])
        print( processedy.shape )
        processedx.reset_index( drop=True, inplace=True )
        processedy.reset_index( drop=True, inplace=True )
        processeddata = pd.concat( [processedx, processedy], axis=1 )
        processedx.to_csv('media/temp/processedx.csv')
        processedy.to_csv('media/temp/processedy.csv')
        processeddata.to_csv( 'media/temp/processeddata.csv' )

        response=Response(status='200',data={'df':'df','processedy':'processedy','processedx':'processedx','x':'x','y':'y','x_test':'x_test','x_train':'x_train','y_test':'y_test','y_train':'y_train'})
        return response


    else:
        # REVIEWING NEEDED
        x=data2.iloc[:,:-1]
        y=data2.iloc[:,-1]

        x_train, x_test, y_train, y_test=split(x,y)

        if missing_val=='True':
            x=data2.iloc[:,:-1]
            y=data2.iloc[:,-1]
            data2=missing_value(data2)

        if label_encoder=='True':
            y_train=label_enc(y_train)
            y_test=label_enc(y_test)
        if one_hot_encoder=='True':
            X_train=one_hot(X_train)
            X_test=one_hot(X_test)

        if featurescale=='True':
            X_train=feature_scaling(X_train)
            X_test=feature_scaling(X_test)

        print(data2)
        data2.to_csv('media/test.csv')
        response=Response(status='200',data={"failed":"true"})
        response.set_cookie('data',data2)
        return response
