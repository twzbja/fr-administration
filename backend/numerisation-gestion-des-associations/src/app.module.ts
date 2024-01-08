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

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [Association, User, Minute, Role],
      synchronize: true,
    }),
  UsersModule, AssociationsModule, AuthModule, MinutesModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
