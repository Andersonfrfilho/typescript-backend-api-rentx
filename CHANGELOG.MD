docker run --name database_ignite -e POSTGRES_PASSWORD=ignite -e POSTGRES_USER=docker -e POSTGRES_DB=rentx -p 5432:5432 -d postgres
docker run --name mongodb -p 27017:27017 -d -t mongo