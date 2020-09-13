from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from uploadapp.models import DataSet
from .Regression import *
from .Classification import *
import pandas as pd
import json

# Create your views here.
@api_view(['POST'])
def algotype(request):
    choice=request.POST['choice'] #Type of algo
    return Response(data={'choice':choice})

@api_view(['POST'])
def algochoose(request):
    choice=request.POST['choice']
    algo=request.POST['algo'] #Algo chosen from list of algos of one type

@api_view(['POST'])
def algorun(request):

    algotype = request.data['algotype']  # Algo type(1 for regression, 2 for classification, 3 for clustering)
    # Specific algo:
    #
    # Linear Regression
    # 1.Simple linear regression
    # 2.Multiple linear regression
    # 3.Polynomial regression
    #
    # Classification
    # 1.Logistic regression
    # 2.K-NN
    # 3.SVM
    #
    # Clustering
    # 1.Kmeans
    # 2.Heirarchical


    algo = request.data['algo']

    x_train = pd.read_csv( 'media/temp/x_train.csv' )
    y_train = pd.read_csv( 'media/temp/y_train.csv' )
    x_test = pd.read_csv( 'media/temp/x_test.csv' )
    y_test = pd.read_csv( 'media/temp/x_test.csv' )
    processedx = pd.read_csv( 'media/temp/processedx.csv' )
    processedy = pd.read_csv( 'media/temp/processedy.csv' )
    processeddata = pd.read_csv( 'media/temp/processeddata.csv' )
    dictop={}

    if algotype==1:
        if algo==1: # Simple Linear Regression
            y_pred_test,y_pred_train,mse=simple_linear_regression(x_train,x_test,y_train,y_test)
            y_pred_test=pd.DataFrame(y_pred_test)
            print("debug")
            print(y_pred_test)
            print(y_pred_train)
            y_pred_train = pd.DataFrame(y_pred_train)
            dictop={
                "graph": {
                    "x": processedx.iloc[:,1].values.tolist(),
                    "x1": x_train.values.tolist(),
                    "y1": y_pred_test.values.tolist(),
                },
                "table": {
                    "x": x_test.values.tolist(),
                    "y_actual": y_test.values.tolist(),
                    "y_predicted": y_pred_test.values.tolist(),
                }
            }

        elif algo==2: # Multiple Linear Regression
            y_pred_test,mse = simple_linear_regression( x_train, x_test, y_train, y_test )
            y_pred_test = pd.DataFrame( y_pred_test )

            dictop = {
                'table' : {
                    'y_actual' : y_test,
                    'y_predicted' : y_pred_test,
                }
            }
        elif algo==2:
            y_pred = poly_regression(processedx,processedy)
            y_pred = pd.DataFrame( y_pred )
            dictop = {
                'table' : {
                    'x' : processedx,
                    'y' : y_pred,
                }
            }
    elif algotype==2:
        if algo==1: # Logistic Regression
            conf_matrix,accuracy,y_pred=logistic_regression(x_train,x_test,y_train,y_test)
            dictop = {
                'confusionmatrix' : conf_matrix,
                'table' : {
                    'x' : x_test,
                    'y_actual' : y_test,
                    'y_predicted' : y_pred,
                },
                'graph': {
                    'x' : x_test,
                    'y_predicted' : y_pred,
                },
                'accuracy': accuracy,
            }
        elif algo==2: # K-NN
            conf_matrix,accuracy,y_pred=KNN(x_train,x_test,y_train,y_test)
            dictop = {
                'confusionmatrix' : conf_matrix,
                'table' : {
                    'x' : x_test,
                    'y_actual' : y_test,
                    'y_predicted' : y_pred,
                },
                'graph' : {
                    'x' : x_test,
                    'y_predicted' : y_pred,
                },
                'accuracy' : accuracy,
            }
        else: # SVM
            conf_matrix, accuracy, y_pred = SVM( x_train, x_test, y_train, y_test )
            dictop = {
                'confusionmatrix' : conf_matrix,
                'table' : {
                    'x' : x_test,
                    'y_actual' : y_test,
                    'y_predicted' : y_pred,
                },
                'graph' : {
                    'x' : x_test,
                    'y_predicted' : y_pred,
                },
                'accuracy' : accuracy,
            }
    elif algotype==3:
        if algo==1: #Kmeans
            pass
        elif algo==2: #Heirachical
            pass

    dictop = json.dumps( dictop )
    return Response(data=dictop)