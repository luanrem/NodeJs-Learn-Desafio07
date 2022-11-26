## command to create database

docker run --name nodejs-learn-desafio07 -e POSTGRES_DB=fin_api -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -p 5432:5432 -d postgres
