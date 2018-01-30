FROM		node:latest

RUN			mkdir -p /var/log/api/

WORKDIR		.

COPY		package.json ./

RUN			npm install --silent

COPY		. .

EXPOSE		8080

ENTRYPOINT	["./node_modules/.bin/forever", "-a", "-l", "/var/log/api/forever.log", "-o", "/var/log/api/forever.log", "-e", "/var/log/api/forever.log", "./server.js"]