import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // Importation de UserModule
  controllers: [AssociationsController],
  providers: [AssociationsService]
})
export class AssociationsModule {}
