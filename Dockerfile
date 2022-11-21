FROM node:16

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./backend/ ./backend/

COPY ./frontend/ ./frontend/

RUN npm run install:backend

RUN npm run install:frontend

RUN npm run build

CMD node ./backend/server.js