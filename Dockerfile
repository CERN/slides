FROM node:12-alpine

USER root
WORKDIR /opt/app-root/src

RUN apk add git && npm i -g local-web-server

COPY build .

EXPOSE 8080

USER 1001
CMD npx ws -p 8080 --spa index.html
