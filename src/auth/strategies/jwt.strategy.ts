import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. ดึง token จาก cookie  
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.comet_token; // ชื่อ cookie
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  // 2. Decode token แล้วเรียก validate() 
  async validate(payload: { id: number; email: string }) {
    // payload : { id: user.id, email: user.email };
    // จะคืนค่า ใน req.user
    return { userId: payload.id, email: payload.email };
  }
}