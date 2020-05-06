FROM node:12-alpine

RUN mkdir -p /home/slides/slides-backend
WORKDIR /home/slides/slides-backend

ENV NODE_ENV production
COPY ./packages/slides-server .
RUN yarn install
USER 1001
# port for nodejs servers
EXPOSE 8000

CMD ["node", "-r", "esm", "./src/index.js"]
