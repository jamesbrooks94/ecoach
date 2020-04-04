FROM node:latest
COPY build .
ENV NODE_ENV=production

CMD node index.js