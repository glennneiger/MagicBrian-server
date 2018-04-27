FROM node:carbon

# Create an app directory
WORKDIR /usr/src/magic-brian-server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

COPY . .

# Expose port 8080
EXPOSE 8080

CMD [ "npm", "start" ]