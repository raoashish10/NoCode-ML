## NoCode-ML

This is a project aimed giving a platform to non coders to use machine learning algorithms without any coding needed. ML is a very vast and very important domain. However, it can be quite overwhelming for a non coder to harness the power of ML.  

Our program gives a  choice to each user to pick the model which they want to use. After this he is given a choice to pick the columns for prediction to be used while giving an option to pick the column for them. Once this is done, the user has to pick the models he wants to use. 

Current models:
1. Regression:
    * Simple Linear Regression
    * Multiple Linear Regression
    * Polynomial Regression
2. Classification:
    * Logistical Regression
    * K Nearest Neighbours (KNN)
    * Support Vector Machine (SVM)
    * Naïve Bayes
3. Clustering:
    * K-Means Clustering
    * Hierarchical Clustering
    
After choosing the model to use, the user is then allowed to pick the data pre-processing techniques if he know about them or else we pick them for him

## Video Demo 

A video demo of the project can be found [here](https://drive.google.com/file/d/1anhyh7Ann1WrBgD5piH1D6T3C1gLxTYQ/view?usp=sharing)

## Installation [Backend]
```
cd backend
```
```
pip3 install -r requirements.txt
```
```
cd nocodeML
```
```
python manage.py makemigrations uploadapp
```
```
python manage.py migrate
```

## Installation [Frontend]
```
cd frontend
```
```
npm install
```

## Running the code

To run the django server
```
python manage.py runserver
```
To run the client server
```
npm start
```

## License
[MIT](https://github.com/raoashish10/NoCode-ML/blob/master/LICENSE)

