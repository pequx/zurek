# syntax = docker/dockerfile:experimental

FROM node:17.3.0-buster-slim as base
ENV PATH=/home/app/.local/bin:/usr/local/bin:/usr/bin:/bin:/app
USER root
RUN apt-get -qqy update
RUN apt-get -qqy install apt-utils make build-essential mc zsh sudo curl
RUN apt-get -qqy install python git
# RUN rm -rf /var/lib/apt/lists/*
RUN install -d -o node -g node /app
RUN chown node /app

FROM base as builder
ENV NODE_ENV=builder
USER root
RUN npm install -g @nestjs/cli
WORKDIR /app
COPY --chown=node package*.json ./
USER node
RUN npm install

FROM builder as backend
ENV NODE_ENV=development
ENV GOTRACEBACK=single
USER root
RUN chsh --shell /bin/zsh
RUN chsh --shell /bin/zsh node
EXPOSE 3000
WORKDIR /app
COPY --chown=node . .
# RUN passwd --expire root
# RUN passwd --expire node
USER node
ENTRYPOINT ["npm", "run", "start:dev"]