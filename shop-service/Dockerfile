FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

EXPOSE 6767
CMD [ "npm", "start" ]
