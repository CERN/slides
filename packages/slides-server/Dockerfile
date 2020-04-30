FROM node:12-alpine

RUN mkdir -p /home/slides/slides-backend
RUN cd /home/slides/slides-backend
WORKDIR /home/slides/slides-backend

# COPY command to copy package.json file.
COPY ./package.json .
RUN yarn install
USER node

# Copy your application code with the appropriate permissions 
# to the application directory on the container:
COPY --chown=node:node . .
ENV NODE_ENV production
# port for nodejs servers
EXPOSE 8000

CMD ["node", "dist/index.js" ]
