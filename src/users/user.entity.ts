// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Association } from '../associations/associations.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  age: Number;

  @ManyToOne(() => Association, association => association.users)
  @ApiProperty({ type: () => Association })
  association: Association;
}
