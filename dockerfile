FROM node:18-alpine

WORKDIR /app

COPY backend/package.json .

RUN npm install --only=prod

RUN mkdir dist

RUN mkdir public

COPY backend/dist dist/

COPY frontend/dist public/

CMD [ "npm", "start" ]