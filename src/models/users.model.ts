import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  schema: 'test',       // สำคัญมาก
  timestamps: false,    // เพราะ table ไม่มี updated_at
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
    type: DataType.STRING(100),
    field: 'name',
  })
  declare name: string;
  @Column({
    type: DataType.STRING(150),
    field: 'email',
  })
  declare email: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  declare createdAt: Date;
}
