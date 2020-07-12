/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Request, Post, Body, UseFilters, UseGuards } from '@nestjs/common';
import { CreateUser } from 'src/dtos/users.dto';
import { UserResponse, LoginResponse } from 'src/interfaces/response';
import { AuthService } from 'src/services/Auth.service';
import { UsersService } from 'src/services/Users.service';
import { HttpExceptionFilter, Exception } from 'src/utils/errorResponse';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('auth/register')
  async register(
    @Request()
    @Body()
    { email, first_name, last_name, password, phone }: CreateUser,
  ): Promise<UserResponse> {
    try {
      const options = {
        where: { email },
      };
      const userExist = await this.usersService.findOne(options);
      if (userExist) {
        return new Promise((resolve, reject) => {
          reject(
            new Exception({
              status: 'CONFLICT',
              message: 'Email already in Use',
            }),
          );
        });
      }
      const user = await this.authService.signUpUser({
        email,
        first_name,
        last_name,
        password,
        phone,
      });

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return error;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req): Promise<LoginResponse> {
    try {
      const jwtObject = await this.authService.login(req.user);
      console.log(jwtObject)
      return {
        success: true,
        data: jwtObject
      };
    } catch (error) {return error}
  }
}
