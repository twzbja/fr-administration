import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Association } from './associations/associations.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Définition du type de la base de données
      host: 'localhost', // Adresse de votre serveur MySQL
      port: 3306, // Port MySQL par défaut
      username: 'root', // Nom d'utilisateur MySQL
      password: 'password', // Mot de passe MySQL
      database: 'mydatabase', // Nom de votre base de données MySQL
      entities: [User, Association], // Liste des entités
      synchronize: true, // Mettre à true pour synchroniser automatiquement le schéma avec la base de données
    }),
    UsersModule, AssociationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
