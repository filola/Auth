import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';
import helmet from 'helmet';
import { ValidationPipe, Logger } from '@nestjs/common';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
    app.use(cookieParser());

    // datadog 추가
    app.useLogger(app.get(PinoLogger));
    const logger = new Logger('main');

    //Swagger 추가
    const config = new DocumentBuilder()
        .setTitle('mannamchu-refac')
        .setDescription('API Document')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();

    app.use(helmet());
    app.useGlobalFilters(new HttpExceptionFilter()); // exception filter

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
    // forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
    // transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    if ((process.env.NODE_ENV as string) === 'production') {
        app.enableCors({
            // origin: true,
            origin: true,
            credentials: true,
        });
    } else {
        app.enableCors({
            origin: true,
            credentials: true,
        });
    }
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    await app.listen(3000, () => {
        logger.log(`Listening on port: 3000`);
    });
}
bootstrap();
