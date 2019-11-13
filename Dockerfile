FROM node:12-alpine

USER root
WORKDIR /opt/app-root/src

RUN apk add git && npm i -g local-web-server
# RUN apk add --update \
#     bash \
#     lcms2-dev \
#     libpng-dev \
#     gcc \
#     g++ \
#     make \
#     autoconf \
#     automake \
#   && rm -rf /var/cache/apk/*


COPY build .

EXPOSE 8080

USER 1001
CMD npx ws -p 8080 --spa index.html
