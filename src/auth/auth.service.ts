import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // POST Login
  async login(loginDto: LoginDto) {
    // ใช้ message เดียวกันทั้ง username ไม่พบ และ password ผิด เพื่อป้องกัน User Enumeration Attack
    // STEP 1: get user by username for checking
    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
    // STEP 2: if having user , check password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
    // STEP 3: สร้าง JWT token
    const payload = { id: user.id, email: user.email };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  // ✅ ดึงข้อมูล user จาก userId
  async getProfile(userId: number) {
    const user = await this.usersService.findOne(userId);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}