FROM node:18
ENV PORT=4000
ENV DATABASE=mongodb://moundir:moundir@mongo:27017
ENV JWT_SECRET=sdfsdfsdfsdfsdfsdfsdfsdf
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]