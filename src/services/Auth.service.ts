import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from './Users.service';
import { CreateUser } from 'src/dtos/users.dto';
import { JwtPayload, JwtObject } from 'src/interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async signUpUser(body: CreateUser): Promise<any> {
    try {
      const hashedPassword = await this.hashPassword(body.password);
      
      const user = await this.usersService.create({ ...body, password: hashedPassword, });
      return user;
    } catch (error) {
      return error
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = process.env.SALT;
    console.log('salt', saltRounds)
    // console.log('hash', hash)
    const hash = await bcrypt.hash(password, 10);
    console.log('hash', hash)
    return hash;
  }

  private isPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  } 

  async validateUser(email: string, pass: string): Promise<any> {
      return new Promise( async (resolve, reject) =>{
        try {
          const options = {
            where: { email },
          };
          const user = await this.usersService.findOne(options);
          if (user && this.isPassword( pass, user.password )) {
            const { password, ...result } = user['dataValues'];
            resolve(result);
          } else {
            resolve(null);
          }
          
        } catch (error) {
          reject(error)
        }
      })
      
    }


  async login(user: JwtPayload): Promise<JwtObject> {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    console.log('token', token)
    return { user, token }
  }
}

