import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto.name,createUserDto.email,createUserDto.password)
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  // findByEmailWithPassword(email: string) {
  //   return this.userRepository.findOne({
  //     where: { email },
  //     // select: ['id', 'name', 'email', 'password', 'role'],
  //   });
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: CreateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
