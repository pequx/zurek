# syntax = docker/dockerfile:experimental

FROM node:17.3.0-buster-slim as base
ENV PATH=/home/app/.local/bin:/usr/local/bin:/usr/bin:/bin:/app
USER root
RUN apt-get -qqy update
RUN apt-get -qqy install apt-utils make build-essential mc zsh sudo curl
RUN apt-get -qqy install python git
RUN install -d -o node -g node /app
RUN chown node /app

FROM base as builder
USER root
WORKDIR /app
COPY --chown=node package*.json ./
USER node
RUN npm install
COPY --chown=node . .

FROM builder as frontend
ENV GOTRACEBACK=single
EXPOSE 8080
USER node
RUN npx -p @storybook/cli sb init
# RUN npm run build-storybook
ENTRYPOINT ["npm", "run", "dev"]