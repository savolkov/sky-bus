# sky-telehouse/sky-bus

Develop (latest): [![Build Status](https://travis-ci.org/sky-telehouse/sky-bus.svg?branch=develop)](https://travis-ci.org/sky-telehouse/sky-bus)
[![](https://images.microbadger.com/badges/version/savolkov/sky-bus.svg)](https://microbadger.com/images/savolkov/sky-bus "Get your own version badge on microbadger.com")

Master (release-1.0.0): [![Build Status](https://travis-ci.org/sky-telehouse/sky-bus.svg?branch=master)](https://travis-ci.org/sky-telehouse/sky-bus)
[![](https://images.microbadger.com/badges/version/savolkov/sky-bus:release-1.0.0.svg)](https://microbadger.com/images/savolkov/sky-bus:release-1.0.0 "Get your own version badge on microbadger.com")

## Installation
1. [Get docker](https://www.docker.com/get-started)
2. Pull Postgres container:
`docker pull postgres`
3. Run Postgres container:  
First use: `docker run -d -p 5432:5432 --name sky_pg -e POSTGRES_PASSWORD=1q2w3e postgres`  
Later: `docker start sky_pg`  
**NB:** credentials are hardcoded in sky-bus, later will be moved to `.env`
4. Use `dump.sql` file to apply DDL to the database.
5. __(optional)__ Get a pgadmin: `docker pull dpage/pgadmin4`
6. __(optional)__ Run pgadmin container:  
   First use: `docker run -p 80:80 --name sky_pgadm -e 'PGADMIN_DEFAULT_EMAIL=user@user.user' -e 'PGADMIN_DEFAULT_PASSWORD=1q2w3e' -d dpage/pgadmin4`  
   Later: `docker start sky_pgadm`
7. __(optional)__ Connect containers in a network so they are able to reach each other:
```shell script
docker network create sky_network
docker network connect sky_network sky_pg
docker network connect sky_network sky_pgadm
docker network inspect sky_network #<-- check pg address
```
8. Apply DDL from `sky-bus/dump.sql` to your database. It restores the nesessary database structure.
**You are ready to develop.** You can use `yarn dev` to run the bus.
If you want to run specific version, use docker:
```shell script
docker pull savolkov/sky-bus
docker run -p 3000:3000 --name sky_bus -d savolkov/sky-bus
```
