FROM node:9.4

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ADD package.json /usr/src/app/package.json

RUN npm install --silent

RUN npm install react-scripts@1.1.0 -g --silent

RUN npm install bootstrap --silent

EXPOSE 3000

CMD ["npm", "start"]