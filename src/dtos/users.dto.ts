import { IsEmail, IsNotEmpty, IsString, IsNumberString } from "class-validator";

export class CreateUser {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;
}

export interface GetUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
