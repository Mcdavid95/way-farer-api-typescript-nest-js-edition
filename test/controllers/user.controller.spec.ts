import { Test } from '@nestjs/testing';
import { UserController } from 'src/controllers/Users.controller';
import { UsersService } from 'src/services/Users.service';
import { Users } from 'src/models/Users';
import { AuthService } from 'src/services/Auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from 'src/interfaces/response';
import { GetUser } from 'src/interfaces/auth.interface';

describe('UserController', () => {
  let userController: UserController;
  let usersService: UsersService;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService, AuthService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    authService = moduleRef.get<AuthService>(AuthService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('register', async () => {
    it('should register a new user', async () => {
      const userResult: Promise<GetUser> = {
        email: 'mcd@gmail.com',
        first_name: 'Mcdavid',
        last_name: 'Eme',
        phone: '09036792739'
      }
      const result: UserResponse = {
        success: true,
        data: {
          email: 'mcd@gmail.com',
          first_name: 'Mcdavid',
          last_name: 'Eme',
          phone: '09036792739'
        }
      }
      jest.spyOn(usersService, 'findOne').mockImplementation(() => userResult)
    })
  })
});
