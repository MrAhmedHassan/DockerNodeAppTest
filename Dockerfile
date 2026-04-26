FROM node:lts-alpine3.22 as base

FROM base as development
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE ${PORT}

FROM base as production
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN npm install --only=production
COPY . .
EXPOSE ${PORT}