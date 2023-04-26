FROM node:14.15.0-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8001
CMD ["npm", "start"]