# syntax = docker/dockerfile:experimental

FROM node:17.3.0-buster-slim as builder
ENV NODE_ENV=builder
USER root
RUN apt-get -qqy update && \
    apt-get -qqy install apt-utils && \
    apt-get -qqy install wait-for-it && \
    apt-get -qqy install make && \
    apt-get -qqy install build-essential
RUN useradd -d /home/app -m -r app
RUN chown app /home/app
RUN install -d -o app -g app /app
RUN chown app /app
ENV PATH=/home/app/.local/bin:/usr/local/bin:/usr/bin:/bin:/app

FROM builder as backend
USER root
ENV NODE_ENV=backend
ENV GOTRACEBACK=single
EXPOSE 3000
RUN apt-get -qqy install mc && \
    apt-get -qqy install zsh && \
    apt-get -qqy install python && \
    rm -rf /var/lib/apt/lists/*

USER app
WORKDIR /app
RUN npm ci && \
    npm install
COPY --from=bulder /app .
ENTRYPOINT ["npm", "run", "start:dev"]