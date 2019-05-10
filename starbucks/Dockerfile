FROM nikolaik/python-nodejs:python3.7-nodejs8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
EXPOSE 3001
CMD [ "node", "app.js" ]
