import { BadRequestException, Body, Get, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class AuthService {
   constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register({ name, email, password, role }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    
    if (user) {
      throw new BadRequestException('El usuario ya existe');
    }

    return await this.usersService.create({name,email,password: await bcrypt.hash(password, 10),role});
  }

  async login({ email, password }: LoginDto) {
    const user:User = await this.usersService.findOneByEmail(email);
    console.log(user)

    if (!user) {
      throw new UnauthorizedException('email erroneo');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password incorrecto');
    }

    const payload = { email: user.email, role: user.role };
    //const payload = { email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      email,
    };
  }
}
