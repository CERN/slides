FROM node:12-alpine

RUN mkdir -p /home/slides/slides-frontend
RUN cd /home/slides/slides-frontend
WORKDIR /home/slides/slides-frontend

# COPY command to copy package.json file.
# COPY ./package.json .
USER root
# RUN npm i -g yarn
RUN npm install -g serve
# install packages
# RUN yarn
# create production build of React
# RUN yarn build
USER node

# Copy your application code with the appropriate permissions 
# to the application directory on the container:
COPY --chown=node:node . .
ENV NODE_ENV production
# port for deployed react
EXPOSE 5000

CMD ["serve", "-s", "build" ]
