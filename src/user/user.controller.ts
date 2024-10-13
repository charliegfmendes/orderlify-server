import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.signup(firstName, lastName, username, password);
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }

  @Post('signin')
  async signin(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.signin(username, password);
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }
}
