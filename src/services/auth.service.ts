import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../database/models/user.model';
import { CreateUser, LoginUser } from '../interfaces/user.interface';
import { PasswordService } from '../utility/hashing';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../utility/mail.util';
import { BuildHtmlService } from '../utility/string.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private configService: ConfigService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private mailService: MailService,
    private buildHtmlService: BuildHtmlService,
  ) {}

  async getToken(user: User): Promise<string> {
    const token = await this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      isVerify: user.isVerify,
    });
    return token;
  }

  async register(createUser: CreateUser): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email: createUser.email,
      },
    });
    if (user) {
      if (user.isVerify) {
        throw new HttpException(
          'User already verified',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    const password = await this.passwordService.hashPassword(
      createUser.password,
    );
    const newUser =
      user ||
      (await this.usersRepository.create({
        name: createUser.name,
        email: createUser.email,
        password,
      }));

    const token = await this.getToken(newUser);
    const html = await this.buildHtmlService.buildHtmlRegisterUser(token);
    await this.mailService.sendMail(
      newUser.email,
      'Email verification from ...!',
      undefined,
      html,
    );
    return newUser;
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
    const isMatch = await this.passwordService.comparePassword(
      loginUser.password,
      user.password,
    );
    if (!isMatch) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
    const token = await this.getToken(user);
    return {
      token: token,
    };
  }

  async verify(token: string): Promise<User> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('app.jwtSecret'),
    });
    const user = await this.usersRepository.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    if (user.isVerify) {
      throw new HttpException('User already verified', HttpStatus.BAD_REQUEST);
    }
    user.isVerify = true;
    await user.save();
    return user;
  }
}
