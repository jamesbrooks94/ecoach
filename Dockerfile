FROM node:latest
COPY build .
ENV NODE_ENV=production

CMD DB_CONNECTION=$DB_CONNECTION DB_PORT=$PORT node index.js