FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
RUN npm run build:client

COPY . .

EXPOSE 4001
CMD [ "npm", "start" ]
