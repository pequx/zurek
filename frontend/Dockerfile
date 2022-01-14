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
ENV NODE_ENV=builder
USER root
WORKDIR /app
COPY --chown=node package*.json ./
USER node
RUN npm install

FROM builder as frontend
ENV NODE_ENV=development
ENV GOTRACEBACK=single
USER root
RUN chsh --shell /bin/zsh
RUN chsh --shell /bin/zsh node
EXPOSE 8080
WORKDIR /app
COPY --chown=node . .
USER node
ENTRYPOINT ["npm", "run", "start"]