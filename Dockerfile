FROM node:22.17.1

RUN npm install -g pnpm 
USER root
WORKDIR /home/node/app