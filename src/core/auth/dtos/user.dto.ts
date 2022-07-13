import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;
}

export class VerifyDto {
  @IsOptional()
  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  code: string;
}
