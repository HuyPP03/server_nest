import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { RoleEnum } from '../../enums/role.enum';

@Table({
  tableName: 'todos',
  timestamps: true,
})
export class Todo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(RoleEnum)),
    defaultValue: RoleEnum.User,
  })
  type: RoleEnum;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  startDate: Date;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  endDate: Date;

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
