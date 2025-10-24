# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG BACKEND_DOMAIN_NAME
ARG BEARER_TOKEN_BACKEND
ARG ENCRYPTION_KEY
ARG HC_OAUTH_CLIENT_SECRET
ARG PUBLIC_HC_OAUTH_CLIENT_ID
ARG PUBLIC_HC_OAUTH_REDIRECT_URL
ARG PUBLIC_HC_OAUTH_RESPONSE_TYPE

# Set environment variables for build
ENV BACKEND_DOMAIN_NAME=$BACKEND_DOMAIN_NAME
ENV BEARER_TOKEN_BACKEND=$BEARER_TOKEN_BACKEND
ENV ENCRYPTION_KEY=$ENCRYPTION_KEY
ENV HC_OAUTH_CLIENT_SECRET=$HC_OAUTH_CLIENT_SECRET
ENV PUBLIC_HC_OAUTH_CLIENT_ID=$PUBLIC_HC_OAUTH_CLIENT_ID
ENV PUBLIC_HC_OAUTH_REDIRECT_URL=$PUBLIC_HC_OAUTH_REDIRECT_URL
ENV PUBLIC_HC_OAUTH_RESPONSE_TYPE=$PUBLIC_HC_OAUTH_RESPONSE_TYPE

# Build the application
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built application and production dependencies from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "build"]
