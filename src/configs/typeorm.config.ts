// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as config from 'config';

// const dbConfig = config.get('db');

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'Board-app',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: dbConfig.synchronize,
// };

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  // host: 'localhost',
  host: 'host.docker.internal',
  port: process.env.PORT,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: 'mannamchu',
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  // synchronize 옵션은 서비스 구동시 소스코드 기반으로 데이터를 동기화 할지 여부이다
  // 즉, true 값을 주면 서버를 실행할 때마다 초기화가 된다. (연습할 때만 쓰자)
  synchronize: true,
};
