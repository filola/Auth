import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CacheRepository } from './cache.repository';

@Module({
    imports: [RedisModule],
    providers: [CacheRepository],
    exports: [CacheRepository],
})
export class CacheModule {}
