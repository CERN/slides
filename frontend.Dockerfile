FROM node:12-alpine

RUN mkdir -p /home/slides/slides-frontend
WORKDIR /home/slides/slides-frontend

RUN npm install -g serve
ENV NODE_ENV production
COPY ./packages/slides-frontend .
RUN yarn install
RUN yarn build
USER 1001
# port for deployed react
EXPOSE 5000

CMD ["serve", "-s", "build" ]
