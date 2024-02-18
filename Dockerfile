# Use an official Node runtime as a parent image
FROM node:20.10.0

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3005

# Define the command to run the app
CMD ["npm", "start"]
