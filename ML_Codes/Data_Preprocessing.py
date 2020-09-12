#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 12 12:46:31 2020

@author: nishantn
"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import statistics as stat
dataset = pd.read_csv('Data.csv')
X = dataset.iloc[:, :-1].values
x = pd.DataFrame(X)
y = dataset.iloc[:, -1].values

def missing_value(data, strategy = 'mean'):
    # Stratergies - mean, median, most frequent(mode) or remove. 
    # If it is constant, fill variable will be the value to replace the missing variables with.
    if strategy == 'remove':
         data.dropna(inplace=True)
    else:
        for i in data:
            if (type(data.iloc[0,i]) == int or type(data.iloc[0,i]) == float):
                if strategy == 'mean':
                    data[i] = data[i].replace(np.nan, np.mean(data[i]))
                elif strategy == 'median':
                    data[i] = data[i].replace(np.nan, np.median(data[i]))
            # By default converts NaN values in string columns to most frequent
            if strategy == 'mode' or type(type(data.iloc[0,i]) == str):
                data[i] = data[i].replace(np.nan, stat.mode(data[i]))
    return data


from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
# For indepedant variables only (x)
def one_hot(data, cells):
    if type(cells)!=list:
        cells = [cells]
    ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), cells)], remainder='passthrough')
    data = ct.fit_transform(data)
    return data


from sklearn.preprocessing import LabelEncoder
# For dependant variables only (y)
def label_enc(data):
    le = LabelEncoder()
    data = le.fit_transform(data)
    return data

# Train test split
from sklearn.model_selection import train_test_split
def split(X,Y, test_size=0.25):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = test_size, random_state = 1)
    return X_train, X_test, y_train, y_test


# Only for integer values for some models
def feature_scaling(data):
    for i in data:
        if (type(data.iloc[0,i]) == int or type(data.iloc[0,i]) == float or type(data.iloc[0,i]) == np.float64 or type(data.iloc[0,i]) == np.int64):
            temp = []
            mean = np.mean(data[i])
            std = np.std(data[i])
            for j in data[i]:
                s = (j-mean)/std    # Standardized Feature Scaling
                temp.append(s)
            data[i] = temp
    return data


def auto(data, model):
    X = data.iloc[:, :-1].values
    x = pd.DataFrame(X)
    y = dataset.iloc[:, -1].values
    x = missing_value(x,'mean')   # Takes mode for string columns
    cells = []
    for i in x:
        if (type(x.iloc[0,i]) == str):
            cells.append(i)
    x_train,x_test,y_train,y_test = split(x,y, 0.3)
    x_train = pd.DataFrame(x_train)
    x_test = pd.DataFrame(x_test)
    if model == 'KMeans' or model == 'KNN' or model == 'PCA':
        x_train = feature_scaling(x_train)
        x_test = feature_scaling(x_test)
    if cells != []:
        x_train = one_hot(x_train, cells)
        x_test = one_hot(x_test, cells)
    if type(y[0]) == str:
        y_train = label_enc(y_train)
        y_test = label_enc(y_test)
        
    return x_train,x_test,y_train,y_test
    
    



     
      
        
      
      
      
      
    
     
	 
		
  