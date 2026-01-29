import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from 'src/models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // ต้อง export เพื่อให้ module อื่นใช้ได้
})
export class UsersModule {}
