## NoCode-ML
FOSS hackathon project to automate pre-processing and machine learning. 

The goal of this project was to enable users to run everything from preprocessing to model selection to visualization without writing a single line of code. It can be used through the frontend as well as an API.

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
[MIT](https://choosealicense.com/licenses/mit/)

