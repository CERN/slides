FROM node:12-alpine

WORKDIR /opt/app-root/src

# USER root
# RUN npm install -g @babel/cli
# RUN npm install -g @babel/preset-env
# RUN npm install -g @babel/core
ENV NODE_ENV production
COPY . .
RUN yarn install
USER node

# port for nodejs servers
EXPOSE 8000
# that's yarn start:prod
CMD ["node", "-r", "esm", "./src/index.js" ]
