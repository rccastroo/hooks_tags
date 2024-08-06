# hooks_tags
An interactive hook and tag search spreadsheet with user access.

## Instructions <br>

1- Install docker and docker-compose on your machine, you can follow the documentation here: [docker documentation](https://docs.docker.com/);<br>
2- Define your database, username and password, root password in the '.env' file at the project root. **NO NEED TO CREATE A DATABASE, DOCKER WILL AUTOMATICALLY DO THIS FOR YOU WHEN INSERTING THE DATA INTO THE '.ENV' FILE**<br>
3- **optional** I left the files with the hooks, tags and example user in '.sql' in case the container does not automatically insert the data, they are found in the root of the project. To insert manually, access the terminal, open the database container (postgres), run psql -d(database name) -U(your user) and insert the data via sql.<br>
4- Now just open **https://localhost:3000/login** and access the user login panel.<br>
