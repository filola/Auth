# 이미지 생성
FROM node:16.14 AS builder

# 작업 디렉토리 생성
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci --only=production

# 소스코드 복사 및 빌드
COPY . .
RUN npm run build

# 실행 환경 설정
FROM node:16.14-alpine
WORKDIR /app
ENV NODE_ENV=production

# 소스코드 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# npm pm2 문제
RUN npm install pm2 -f
RUN npm install dd-trace -f
RUN npx pm2 install typescript

EXPOSE 3000

# 앱 실행
CMD ["npm", "run", "start:prod"]