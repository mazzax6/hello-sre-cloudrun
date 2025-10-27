# Use a small Node image
FROM node:18-alpine

# App directory
WORKDIR /srv

# Copy metadata first (cache-friendly), then install (nothing to install here)
COPY package.json ./
RUN npm install --only=production || true

# Copys the code
COPY . .

# Cloud Run listens on $PORT; we default to 8080
EXPOSE 8080
CMD ["npm","start"]
