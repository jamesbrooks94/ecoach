FROM node:latest
WORKDIR /code
COPY build .
ENV NODE_ENV=production


EXPOSE 3000
CMD DB_CONNECTION="postgres://postgres@host.docker.internal:5432/ecoach2" DB_PORT=3000 node /code/index.js