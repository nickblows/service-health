# Use Node.js 20 LTS as base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (with strict-ssl disabled to handle proxy issues)
RUN npm config set strict-ssl false && npm ci

# Copy application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
