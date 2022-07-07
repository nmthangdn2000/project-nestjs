import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
