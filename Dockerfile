FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Overridable at runtime (see docker-compose.yml). Used by nginx to proxy
# /support, /orders, /hello to the backend — substituted into
# default.conf.template by the nginx image's built-in envsubst entrypoint.
ENV BACKEND_URL=http://host.docker.internal:5005

EXPOSE 80
