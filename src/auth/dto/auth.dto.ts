import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

class AuthDto {
  @ApiProperty()
  @MaxLength(50)
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class LoginDto extends AuthDto {}