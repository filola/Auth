import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeORMConfig } from './configs/typeorm.config';
import { LoggerMiddleware } from './utils/logger';
import { UsersModule } from './users/users.module';
import { Carts } from './entities/cart.entity';
import { Options } from './entities/option.entity';
import { Products } from './entities/product.entity';
import { Users } from './entities/user.entity';
import { ProductTags } from './entities/productTag.entity';
import { Tags } from './entities/tag.entity';
import { Wishlists } from './entities/wishlist.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [
            Carts,
            Options,
            Products,
            Users,
            ProductTags,
            Tags,
            Wishlists,
          ],
          autoLoadEntities: true,
          charset: 'utf8mb4',
          synchronize: true,
          // logging: true, // query 날리는것 로깅
          // keepConnectionAlive: true, //hot reloading 할때 필요
        };
      },
    }),
    ProductsModule,
    UsersModule,
    OrdersModule,
    AuthModule,
  ],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
