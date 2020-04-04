FROM node:latest
COPY build .

CMD NODE_ENV=production node index.js