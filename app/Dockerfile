FROM gcr.io/google-appengine/nodejs

WORKDIR /app

# RUN "echo REACT_APP_DEV_ENV=TRUE" > .env

COPY ./package*.json ./

RUN npm install

COPY . ./

ENV PORT=8080
ENV REACT_APP_DEV_ENV=TRUE

EXPOSE 8080

CMD [ "npm", "start" ]
