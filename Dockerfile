FROM node:18.17.1-alpine

WORKDIR /usr/src/app

# Copy package files + scripts folder BEFORE npm ci
COPY package.json package-lock.json ./
COPY scripts ./scripts

# Now npm ci works, because check-node.js exists
RUN npm ci

# Copy rest of your project
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
