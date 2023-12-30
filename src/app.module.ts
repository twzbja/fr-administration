import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'mydatabase.db',
            entities: [],
            synchronize: true,
          }),
    UsersModule, AssociationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
