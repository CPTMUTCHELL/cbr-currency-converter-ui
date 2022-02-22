FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]