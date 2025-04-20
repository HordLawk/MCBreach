FROM node:23

WORKDIR /app

COPY . .
RUN npm i
RUN npm run build

CMD ["node", ".output/server/index.mjs"]