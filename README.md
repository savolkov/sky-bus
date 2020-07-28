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
4. Get a pgadmin: `docker pull dpage/pgadmin4`
5. Run pgadmin container:  
   First use: `docker run -p 80:80 --name sky_pgadm -e 'PGADMIN_DEFAULT_EMAIL=user@user.user' -e 'PGADMIN_DEFAULT_PASSWORD=1q2w3e' -d dpage/pgadmin4`  
   Later: `docker start sky_pgadm`
6. Connect containers in a network so they are able to reach each other (make a shell script or run each of the following lines):
```shell script
docker network create sky_network
docker network connect sky_network sky_pg
docker network connect sky_network sky_pgadm
docker network inspect sky_network
```
7. Type `localhost` in your web-browser's address bar. If you have done everything correctly, you should be able to see a pgAdmin login page.
8. Input the default login/password: `user@user.user`/`1q2w3e` (from p. 5). You should see the pgAdmin dashboard.
9. Press "Add new server" in Quick Links section. In General tab in Name input sky_pg, then go to connection tab and set Host name/address to `localhost:5432`, username to `postgres` and password to `1q2w3e` (username and password are from p. 3).
10. Press Save.
11. In the `Browser` tab (on the left) select `servers->sky_pg->Databases->postgres`.
12. Open `Tools->Query tool` in the top bar.
13. Paste all of the code from `dump.sql` file from the root of the repository to the Query editor and press the ▶ button above.
14. Refresh the page. You should be able to see `sky` scheme in Schemas.
15. Go to the root of the cloned repository and run:
```shell script
yarn
yarn dev
```
16. Input `localhost:3000/ping` in your browser address bar. You should get `PONG GET` in response.

**You are ready to develop.** You can use `yarn dev` to run the bus.
If you want to run specific version, use docker:
```shell script
docker pull savolkov/sky-bus
docker run -p 3000:3000 --name sky_bus -d savolkov/sky-bus
```
