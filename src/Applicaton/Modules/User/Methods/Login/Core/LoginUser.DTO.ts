import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDTO {
  @IsString()
  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;
}