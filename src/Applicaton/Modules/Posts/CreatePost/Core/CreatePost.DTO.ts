import { IsString, Length } from 'class-validator'

export class RegisterPostDTO {
  @IsString()
  @Length(1, 150)
  title: string;

  @IsString()
  @Length(1, 100000)
  content: string;
}