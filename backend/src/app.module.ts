import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Association } from './associations/association.entity';
import { AssociationsModule } from './associations/associations.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/role.entity';
import { MinutesModule } from './minutes/minutes.module';
import { RolesModule } from './roles/roles.module';
import { Minute } from './minutes/minute.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageService } from './message/message.service';
import { config } from 'process';

@Module({
  imports:[
    ConfigModule.forRoot({isGlobal: true, envFilePath: '../../.env'}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        port: config.get<number>('POSTGRES_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    ClientsModule.register([{
      name: 'GREETING_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls:['amqp://admin:123456@rabbitmq:5672/'],
        queue: 'books_queue',
        queueOptions: {
          durable: false
        }
      }
    }]),
  UsersModule, AssociationsModule, AuthModule, MinutesModule, RolesModule],
  controllers: [AppController],
  providers: [AppService, MessageService],
  exports: [MessageService],
})
export class AppModule {
  static forRootAsync: any;
  static forRoot(): any {
    throw new Error('Method not implemented.');
  }
}
