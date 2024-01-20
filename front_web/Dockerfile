FROM node:16 as build

WORKDIR /twzbja/front_web/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
