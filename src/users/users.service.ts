import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto, GetUserDto} from './dto/user.dto';
import { Users } from 'src/models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      // ตรวจสอบว่า email ซ้ำหรือไม่
      const existingEmail = await this.userModel.findOne({
        where: { email: createUserDto.email }
      });
      if (existingEmail) {
        throw new ConflictException('มีอีเมลนี้ในระบบแล้ว');
      }

      // ตรวจสอบว่า username ซ้ำหรือไม่
      const existingUser = await this.userModel.findOne({
        where: { username: createUserDto.username }
      });
      if (existingUser) {
        throw new ConflictException('มีชื่อผู้ใช้นี้ในระบบแล้ว');
      }

      const saltRounds = 10; // จำนวนรอบการเข้ารหัส
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
      
      const user = await this.userModel.create({ 
        ...createUserDto,
        password: hashedPassword 
      } as any);

      // ไม่ส่ง password กลับไป
      const { password, ...result } = user.toJSON();
      return result;

    } catch (error) {
      // ถ้าเป็น ConflictException ที่เราโยนเอง ก็โยนต่อไป
      if (error instanceof ConflictException) {
        throw error;
      }
      
      // จัดการ unique constraint error จาก database (กรณี race condition)
      if (error.name === 'SequelizeUniqueConstraintError') {
        // ดูว่า field ไหนซ้ำ
        const fields = error.errors?.map((e: any) => e.path) || [];
        
        if (fields.includes('email')) {
          throw new ConflictException('มีอีเมลนี้ในระบบแล้ว');
        }
        if (fields.includes('username')) {
          throw new ConflictException('มีชื่อผู้ใช้นี้ในระบบแล้ว');
        }
        
        // กรณี field อื่นๆ ที่เป็น unique
        throw new ConflictException('ข้อมูลซ้ำในระบบ');
      }

      // error อื่นๆ จากหลังบ้าน
      console.error('Create user error:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  findAll(getUserDto: GetUserDto) {
    return this.userModel.findAll({
      attributes: {
        exclude: ['password']
      },
      where: getUserDto as any
    });
  }

  findByUsername(username: string) {
    return this.userModel.findOne({
      where: { username },
    });
  }

  async findOne(id: number) {
    return this.userModel.findOne({
      attributes: {
        exclude: ['password']
      },
      where: { id: id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
