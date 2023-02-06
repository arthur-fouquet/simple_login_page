FROM node:16.13.0-alpine

WORKDIR /front-end

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1


COPY . ./

CMD ["npm", "start"]