FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN cd backend && npm install
RUN cd frontend && npm install

RUN cd backend && npm run build
RUN cd frontend && npm run build


FROM node:18-alpine

WORKDIR /app

COPY --from=builder app/backend/package.json .

COPY --from=builder app/backend/node_modules node_modules
RUN npm prune --production

COPY --from=builder app/backend/dist dist

COPY --from=builder app/frontend/dist public

CMD [ "npm", "start" ]