# Firebase

## Based on:
- https://bezkoder.com/node-js-rest-api-express-mysql/
- https://bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/
- https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
- https://stackoverflow.com/questions/14322989/first-heroku-deploy-failed-error-code-h10

## Project Details
- Node JS
- Express
- Postman
- MySQL

## MySQL Download
```https://dev.mysql.com/downloads/mysql/```

## To Run MySQL:
Make sure MySQL Server is ON via the System Preferences Panel, then in terminal, run:                 
```mysql -u root -p```                 
```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';```                   
```flush privileges;```                 
```SHOW DATABASES;```             
```CREATE DATABASE customers;```                 
```USE customers```                 
```SHOW TABLES;```                 
```SELECT * FROM customers;```                 
```DESCRIBE customers;```

## To Run Server:
```node server.js```           

## Localhost URL
```http://localhost:3000/```

## Deploy URL
```https://sabinach-mysql.herokuapp.com/```
