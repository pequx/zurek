# syntax = docker/dockerfile:experimental

FROM node:17.3.0-buster-slim as builder
ENV NODE_ENV=builder
USER root
RUN apt-get -qqy update && \
    apt-get -qqy install apt-utils && \
    apt-get -qqy install wait-for-it && \
    apt-get -qqy install make && \
    apt-get -qqy install build-essential
RUN apt-get -qqy install mc && \
    apt-get -qqy install zsh && \
    apt-get -qqy install python && \
    rm -rf /var/lib/apt/lists/*
# RUN useradd -d /home/app -m -r app
# RUN chown node /home/app
RUN install -d -o node -g node /app
RUN chown node /app
ENV PATH=/home/app/.local/bin:/usr/local/bin:/usr/bin:/bin:/app
WORKDIR /app
COPY . .
RUN npm install

FROM builder as backend
USER root
ENV NODE_ENV=backend
ENV GOTRACEBACK=single
EXPOSE 3000
USER node
WORKDIR /app
ENTRYPOINT ["npm", "run", "start:dev"]