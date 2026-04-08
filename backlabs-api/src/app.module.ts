import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig = configService.get('database') as
          | TypeOrmModuleOptions
          | undefined;
        if (!dbConfig) {
          throw new Error('Database configuration is missing');
        }
        return dbConfig;
      },
    }),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
@Controller()
export class SpaController {
  @Get('*')
  serveSpa(@Res() res: express.Response) {
    res.sendFile('index.html', { root: 'public' });
  }
}

export class AppModule {}
