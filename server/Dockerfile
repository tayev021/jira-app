# Base image
FROM node:24-bookworm-slim as base
WORKDIR /app
COPY package*.json .
RUN npm ci

# Development image
FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

# Build image
FROM base AS build
COPY . .
RUN npm run build

# Production image
FROM node:24-bookworm-slim AS production
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
CMD ["node", "dist/server.js"]