FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --platform=linux/arm64

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "start"]