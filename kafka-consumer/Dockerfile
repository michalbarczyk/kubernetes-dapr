FROM node:8-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run buildclient
EXPOSE 8080
CMD [ "npm", "run", "start" ]