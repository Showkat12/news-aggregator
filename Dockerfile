# Dockerfile (recommended - Debian based)
FROM node:18-bullseye-slim AS deps
WORKDIR /app

# install build tools (makes compiling native modules possible if needed)
RUN apt-get update && apt-get install -y build-essential python3 make gcc g++ --no-install-recommends && apt-get clean && rm -rf /var/lib/apt/lists/*

# copy package files and install inside the image (Linux modules will be installed)
COPY package.json package-lock.json ./
RUN npm ci --silent

FROM node:18-bullseye-slim AS builder
WORKDIR /app
# copy the linux node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
# copy public only if exists; harmless if exists or not
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
