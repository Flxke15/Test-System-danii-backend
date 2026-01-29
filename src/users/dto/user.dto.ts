import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsIn, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: "สถานะของบัญชี 0: ปกติ, 1: ยกเลิก" })
  @IsIn([0, 1])
  isActive?: number;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastLoginAt?: string;
}

// ✅ Create: ตัด field ที่ระบบสร้างเองออก และยังคง required ตามที่ตั้งไว้ใน UserDto
export class CreateUserDto extends OmitType(UserDto, [
  'id',
  'isActive',
  'createdAt',
  'updatedAt',
  'lastLoginAt',
] as const) {}

// ✅ Update: ทุก field optional
export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id', 'createdAt', 'updatedAt'] as const)
) {}

// ✅ Get/Search: ใช้สำหรับ query/filter -> ทุก field optional
// export class GetUserDto extends PartialType(
//   PickType(UserDto, ['username', 'email', 'name', 'isActive'] as const)
// ) {}

export class GetUserDto extends PartialType(
  PickType(UserDto, ['username', 'email', 'name', 'isActive'] as const)
) {}



