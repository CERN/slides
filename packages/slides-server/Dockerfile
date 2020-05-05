FROM node:12-alpine

# RUN mkdir -p /home/slides/slides-backend
# RUN cd /home/slides/slides-backend
# WORKDIR /home/slides/slides-backend

ENV NODE_ENV production
COPY . .
RUN yarn install
USER node
# port for nodejs servers
EXPOSE 8000

CMD ["node", "-r", "esm", "./src/index.js"]
