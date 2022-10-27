import { IsString, Length, IsEmail, Max, Min, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator'

export class RegisterUserDTO {
  @IsString()
  @Length(4, 50)
  name: string;

  @IsString()
  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsString()
  @Length(4, 50)
  @IsNotEmpty()
  profileName: string;

  @IsString()
  @Length(6, 30)
  password: string;

  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  @IsBoolean()
  isPublicEntity: boolean;
}