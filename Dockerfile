FROM node:16.14.2-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
COPY . .
EXPOSE 5001 3306
CMD ["npm","run","start"] 