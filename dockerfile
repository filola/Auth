FROM node:16.14

WORKDIR /usr/src/app

# RUN npm i -g @nestjs/cli typescript ts-node

COPY package.json ./

# COPY node_modules ./

RUN npm install --save -f

RUN npm install pm2 -f

RUN npm install dd-trace -f

RUN npx pm2 install typescript

COPY ./ ./

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start:dev"]