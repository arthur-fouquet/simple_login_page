FROM node:18-alpine

WORKDIR /back-end

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
# RUN npm run build

# CMD ["node", "dist/main.js"]
