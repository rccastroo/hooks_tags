# hooks_tags
An interactive hook and tag search spreadsheet with user access.

## Instructions <br>

1- Install docker and docker-compose on your machine, you can follow the documentation here: [docker documentation](https://docs.docker.com/);<br>
2- Define your database, username and password, root password in the '.env' file at the project root. **NO NEED TO CREATE A DATABASE, DOCKER WILL AUTOMATICALLY DO THIS FOR YOU WHEN INSERTING THE DATA INTO THE '.ENV' FILE**<br>
3- If you want to change the script data when mounting the db, it can be found in the **db-scripts/init/.sql** folder
4- Mount the container in the root where docker-compose is located, with the command: **docker compose up --build**
5- Now just open **https://localhost:3000/login** and access the user login panel.<br>
