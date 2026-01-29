import { Controller, Post, Body, Res, HttpCode, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import * as express from 'express';
import { AuthService } from './auth.service';

import { LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: express.Response) {
    const result = await this.authService.login(loginDto);

    res.cookie('comet_token', result.access_token, {
      httpOnly: true,    // JavaScript อ่านไม่ได้
      secure: process.env.NODE_ENV === 'production', // HTTPS เฉพาะ production
      sameSite: 'strict' as const, // ป้องกัน CSRF
      maxAge: 24 * 60 * 60 * 1000, // 1 วัน
    });
    
    return res.json({
      status: 'success',
      user: result.user
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: express.Response) {
    // ลบ cookie โดยตั้งค่าให้หมดอายุทันที
    res.clearCookie('comet_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    });

    return res.json({ message: 'ออกจากระบบสำเร็จ' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Req() req: express.Request) {
    // req.user มาจาก JwtStrategy.validate()
    return this.authService.getProfile((req as any).user['userId']);
  }
}
