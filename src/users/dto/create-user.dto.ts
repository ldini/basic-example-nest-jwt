import { Role } from "src/common/enum/role.enum";

export class CreateUserDto {
    email: string;
    password: string;
    name?: string;
    role?: Role;
  }
  