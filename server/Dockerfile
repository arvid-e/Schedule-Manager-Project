# Use a Node.js LTS Alpine image for a smaller base size
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
# and install dependencies. This step is cached, so it's faster if dependencies don't change.
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your TypeScript code (if you have a build step)
# This assumes 'npm run build' outputs to 'dist'
RUN npm run build

# Expose the port your Express app listens on
EXPOSE 3000

# Define the command to run your application
# 'npm start' usually runs 'node dist/server.js' as defined in package.json
CMD ["npm", "run", "start"]
