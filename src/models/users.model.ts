import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  schema: 'test',       // สำคัญมาก
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    field: 'username',
  })
  declare username: string;

  @Column({
    type: DataType.STRING(150),
    field: 'email',
  })
  declare email: string;

  @Column({
    type: DataType.TEXT,
    field: 'password',
  })
  declare password: string;

  @Column({
    type: DataType.STRING(100),
    field: 'name',
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    field: 'is_active',
  })
  declare isActive: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'updated_at',
  })
  declare updatedAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'last_login_at',
  })
  declare lastLoginAt: Date;
}
