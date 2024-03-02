# Use the Node.js version 18 Alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/Weather-app

# Copy the contents of the 'public' directory from the local machine to the 'public' directory inside the container
COPY public/ /usr/src/Weather-app/public

# Copy the contents of the 'src' directory from the local machine to the 'src' directory inside the container
COPY src/ /usr/src/Weather-app/src

# Copy package.json and package-lock.json from the local machine to the working directory inside the container
COPY package*.json /usr/src/Weather-app

# Install dependencies using npm
RUN npm install

# Specify the default command to run when the container starts
CMD [ "npm", "start" ]
