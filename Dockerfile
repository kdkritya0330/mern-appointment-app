# Stage 1: Build Stage (with full dependencies)
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Stage 2: Runtime Stage (minimal dependencies)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from 'builder' stage
COPY --from=builder /app /app

# Expose the backend API port
EXPOSE 8080

# Command to start the backend
CMD ["node", "server.js"]
