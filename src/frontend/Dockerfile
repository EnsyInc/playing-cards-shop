FROM node:lts-bullseye-slim as builder

WORKDIR /app
COPY . .

RUN [ "npm", "ci" ]
RUN [ "npm", "run", "build-prod" ]

FROM nginx:alpine

COPY --from=builder /app/dist/playing-cards-shop /usr/share/nginx/html
