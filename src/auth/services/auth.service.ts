import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../../database/models/user.model';
import { CreateUser, LoginUser } from '../../interfaces/user.interface';
import { comparePassword, hashPassword } from '../../utility/hashing';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUser): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: createUser.email,
      },
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const password = await hashPassword(createUser.password);
    return this.usersRepository.create({
      name: createUser.name,
      email: createUser.email,
      password,
    });
  }

  async login(loginUser: LoginUser): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({
      where: {
        email: loginUser.email,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    const isMatch = await comparePassword(loginUser.password, user.password);
    if (!isMatch) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    const token = await this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return {
      token: token,
    };
  }
}
