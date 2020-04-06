FROM node:alpine
COPY . .
RUN yarn install
RUN yarn build

CMD NODE_ENV=production MIGRATIONS_DIRECTORY=./build/migrations node build/server.js