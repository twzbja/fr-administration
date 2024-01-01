import { Module } from '@nestjs/common';
import { AssociationsController } from './associations.controller';
import { AssociationsService } from './associations.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from '../associations/associations.entity'; // Importez votre entité Association ici

@Module({
  imports: [
    UsersModule, // Importation du module des utilisateurs
    TypeOrmModule.forFeature([Association]), // Importation de l'entité Association
  ],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {}
