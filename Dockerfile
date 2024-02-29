FROM node:16

WORKDIR /src


COPY package*.json ./
COPY tsconfig.json ./
COPY ./app ./app
COPY ./swagger ./swagger


RUN npm install



# CMD [ "node", "index.ts" ]
