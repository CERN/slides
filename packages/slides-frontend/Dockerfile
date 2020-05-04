FROM node:12-alpine

RUN mkdir -p /home/slides/slides-frontend
RUN cd /home/slides/slides-frontend
WORKDIR /home/slides/slides-frontend

USER root
RUN npm install -g serve
USER node
# Copy your application code with the appropriate permissions 
# to the application directory on the container:
COPY --chown=node:node build .
ENV NODE_ENV production
# port for deployed react
EXPOSE 5000

CMD ["serve", "-s", "build" ]
