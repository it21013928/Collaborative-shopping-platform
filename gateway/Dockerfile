FROM node:14.15.0-alpine
WORKDIR /
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]