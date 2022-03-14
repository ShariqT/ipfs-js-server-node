FROM node:buster

RUN mkdir /app
COPY ./ /app
WORKDIR /app
RUN npm install
EXPOSE 4012
EXPOSE 80
ENTRYPOINT [ "node" , "server.js" ]