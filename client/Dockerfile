# Base image
FROM node:24-bookworm-slim AS base
WORKDIR /app

# Base dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Development image
FROM deps AS development
COPY . .
CMD ["npm", "run", "dev"]

# Build image
FROM deps AS build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY . .
RUN npm run build

# Production image
FROM nginx:alpine AS production
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]