# Stage 1: Build Stage (with full dependencies)
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app (output to the 'build' folder)
RUN npm run build

# Stage 2: Runtime Stage (minimal dependencies)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install 'serve' to serve the built React app
RUN npm install -g serve

# Copy the build folder from the 'builder' stage to this image
COPY --from=builder /app/build /app/build

# Expose port for serving the app
EXPOSE 3000

# Command to start serving the React app
CMD ["serve", "-s", "build"]
