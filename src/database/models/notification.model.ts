import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Todo } from './todo.model';
import {
  NotificationEnum,
  NotificationTypeEnum,
} from '../../enums/notification.enum';

@Table({
  tableName: 'notifications',
  timestamps: true,
})
export class Notification extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Todo)
  @Column({
    type: DataType.INTEGER,
  })
  todoId: number;

  @Column({
    type: DataType.ENUM(...Object.values(NotificationEnum)),
    allowNull: false,
    defaultValue: NotificationEnum.NotSeen,
  })
  status: NotificationEnum;

  @Column({
    type: DataType.ENUM(...Object.values(NotificationTypeEnum)),
    allowNull: false,
    defaultValue: NotificationTypeEnum.Create,
  })
  type: NotificationTypeEnum;

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

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Todo)
  todo: Todo;
}
