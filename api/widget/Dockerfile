FROM node:10.16.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9001

CMD [ "npm", "start" ]
