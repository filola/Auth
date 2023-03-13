# STEP 1 (build)
FROM node:16.14 AS builder

WORKDIR /usr/src/app

# RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json ./

# COPY node_modules ./

RUN npm install --save -f

RUN npm install pm2 -f

RUN npm install dd-trace -f

RUN npx pm2 install typescript

COPY ./ ./

RUN npm run build

RUN ls -al

RUN ls /usr/src/app/dist -al

# STEP 2 (deploy)
FROM node:16.14-alpine AS deploy

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:dev"]