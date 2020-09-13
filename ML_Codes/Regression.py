#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 12 04:45:52 2020

@author: nishantn
"""
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
# Only 1 dependant and 1 independant variable
def simple_linear_regression(X_train,X_test,y_train, y_test):
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)
    y_pred = regressor.predict(X_test)
    mse = mean_squared_error(y_test,y_pred) 
    # plt.scatter(X_train, y_train, color = 'red')
    # plt.plot(X_train, regressor.predict(X_train), color = 'blue')
    # plt.title('Salary vs Experience (Training set)')
    # plt.xlabel('Years of Experience')
    # plt.ylabel('Salary')
    # plt.show()
    
    # plt.scatter(X_test, y_test, color = 'red')
    # plt.plot(X_train, regressor.predict(X_train), color = 'blue')
    # plt.title('Salary vs Experience (Test set)')
    # plt.xlabel('Years of Experience')
    # plt.ylabel('Salary')
    # plt.show()
    return y_pred, regressor.predict(X_train), mse


def multiple_linear_regression(X_train,X_test,y_train, y_test):
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)
    y_pred = regressor.predict(X_test)
    mse = mean_squared_error(y_test,y_pred) 
    return y_pred, mse



from sklearn.preprocessing import PolynomialFeatures
# Takes entire dataset (No train-test split)
# Only 1 dependant and 1 independant variable
def poly_regression(X,y):
    poly_reg = PolynomialFeatures(degree = 5)
    X_poly = poly_reg.fit_transform(X)
    lin_reg = LinearRegression()
    lin_reg.fit(X_poly, y)
    
    # y_pred = lin_reg.predict(poly_reg.fit_transform(X_test))
    # mse = mean_squared_error(y_test,y_pred)
    # print("MSE at i = ",i," is ",mse)
    
    plt.scatter(X, y, color = 'red')
    plt.plot(X, lin_reg.predict(poly_reg.fit_transform(X)), color = 'blue')
    plt.title('Truth or Bluff (Polynomial Regression)')
    plt.xlabel('Position level')
    plt.ylabel('Salary')
    plt.show()
    return lin_reg.predict(poly_reg.fit_transform(X))