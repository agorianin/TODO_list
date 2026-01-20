# ---- Build stage ----
FROM node:22-alpine AS build
WORKDIR /app
# TODO: Coment out the line below before SUBMIT - only local solution
#RUN npm config set strict-ssl false
# Install deps
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build
COPY . .
CMD npm start

