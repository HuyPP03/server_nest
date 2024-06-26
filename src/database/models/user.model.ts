import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  Unique,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { RoleEnum } from '../../enums/role.enum';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(RoleEnum)),
    defaultValue: RoleEnum.User,
  })
  role: RoleEnum;

  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isVerify: boolean;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;
}
