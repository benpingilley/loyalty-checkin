FROM		node:latest

MAINTAINER	ben.pingilley@gmail.com

RUN			mkdir -p /var/log/api/

COPY		package.json /opt/application/

RUN			cd /opt/application && npm install --silent

COPY		. /opt/application

EXPOSE		8080

ENTRYPOINT	["/opt/application/node_modules/.bin/forever", "-a", "-l", "/var/log/api/forever.log", "-o", "/var/log/api/forever.log", "-e", "/var/log/api/forever.log", "/opt/application/server.js"]
