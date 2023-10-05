// import { Role } from 'src/common/enum/rol.enum';
import { Role } from 'src/common/enum/role.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: string;

  // @DeleteDateColumn()
  // deletedAt: Date;

  constructor(name:string,email:string,password:string,role?:Role){
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
