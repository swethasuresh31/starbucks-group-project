FROM node:8-alpine
RUN mkdir -p /usr/src/starbucksapp
WORKDIR /usr/src/starbucksapp
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "node", "app.js" ]
