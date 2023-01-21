FROM node:18
ENV REACT_APP_API_URL="http://localhost:4000/api"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]