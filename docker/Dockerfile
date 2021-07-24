########################################
### base-dev: 개발 환경
########################################
FROM node:16 AS base-dev
LABEL maintainer randonns@gmail.com

RUN npm install -g npm@latest

########################################
### server-dev: 서버 개발 환경
########################################
FROM base-dev AS server-dev
LABEL maintainer randonns@gmail.com

WORKDIR /server
CMD npm install && npm run dev
EXPOSE 3000

########################################
### client-dev: 클라이언트 개발 환경
########################################
FROM base-dev AS client-dev
LABEL maintainer randonns@gmail.com

WORKDIR /client
CMD npm install && npm run dev
EXPOSE 4000
