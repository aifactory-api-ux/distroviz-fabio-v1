import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get('POSTGRES_USER', 'distroviz'),
        password: configService.get('POSTGRES_PASSWORD', 'supersecret'),
        database: configService.get('POSTGRES_DB', 'distroviz'),
        entities: [OrderEntity],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}