import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinutesModule } from 'src/minutes/minutes.module';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { Association } from './association.entity';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Association]), UsersModule,RolesModule,forwardRef(() => MinutesModule)],
  controllers: [AssociationsController],
  providers: [AssociationsService],
  exports: [AssociationsService]
})
export class AssociationsModule {}
