FROM node:8

RUN dpkg --add-architecture i386
RUN apt-get update
RUN apt-get -y install wine wine32 --no-install-recommends

WORKDIR /electronapp

COPY package.json .
RUN npm install --production
COPY . .
