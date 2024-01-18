import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsModule } from 'src/associations/associations.module';
import { UsersModule } from 'src/users/users.module';
import { Minute } from './minute.entity';
import { MinutesController } from './minutes.controller';
import { MinutesService } from './minutes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Minute]), forwardRef(() => AssociationsModule), UsersModule],
  controllers: [MinutesController],
  providers: [MinutesService],
  exports: [MinutesService]
})
export class MinutesModule {}
