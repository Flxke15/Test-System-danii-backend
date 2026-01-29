import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiProperty()
  @IsString()
  passwordHash: string;
  
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;
}