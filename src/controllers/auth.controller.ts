import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataResponse } from '../utility/dataResponse';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return new DataResponse(user, 'Success', HttpStatus.OK);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);
    return new DataResponse(user, 'Success', HttpStatus.OK);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() data: any) {
    const user = await this.authService.verify(data.token);
    return new DataResponse(user, 'Success', HttpStatus.OK);
  }
}
