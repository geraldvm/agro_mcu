FROM node:16-alpine3.14
WORKDIR /app

COPY package*.json ./

RUN npm install
EXPOSE 3030
COPY . .
CMD ["npm", "start"]