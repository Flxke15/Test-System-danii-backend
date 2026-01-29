import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MaxLength } from "class-validator";

class SearchDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: "สถานะของบัญชี 0: ปกติ, 1: ยกเลิก",
    enum: [0, 1]
   })
  @IsOptional()
  @IsIn([0, 1])
  isActive?: number;
}

export class GetUserDto extends SearchDto {}