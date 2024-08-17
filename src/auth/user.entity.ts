import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'faizanzafar', description: 'username of the User' })
  username: string;

  @Column()
  @ApiProperty({ example: 'password', description: 'password of the User' })
  password: string;

  @Column()
  @ApiProperty({ example: true, description: 'Whether the User is Super User' })
  isSuperUser: boolean;
}
