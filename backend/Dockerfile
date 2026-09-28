FROM node:20-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

# Install dependencies first so this layer is cached when only source changes.
COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js .

# node:20-slim ships a non-root "node" user.
USER node

EXPOSE 3000

CMD ["node", "server.js"]
