FROM node:alpine

WORKDIR /bonsai/user

COPY package.json .

RUN npm i

COPY . .

RUN npm run build
RUN npm prune --production

EXPOSE 3010

CMD ["node", "dist/main"]