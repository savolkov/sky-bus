FROM node:12.16.3-alpine
# Create app directory
WORKDIR /usr/src/sky-bus
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
RUN yarn build
CMD ["node", "dist/index.js"]
