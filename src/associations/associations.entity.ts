import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Association {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.association)
  @ApiProperty({ type: () => User })
  @JoinTable()
  users: User[];

  @Column()
  name: string;
}

