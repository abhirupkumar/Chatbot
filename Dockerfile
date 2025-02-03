FROM node:20-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.mjs .
COPY .eslintrc.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]