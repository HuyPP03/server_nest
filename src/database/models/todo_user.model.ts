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
import { TodoEnum } from '../../enums/todo.enum';

@Table({
  tableName: 'todo_users',
  timestamps: true,
})
export class TodoUser extends Model {
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
    type: DataType.ENUM(...Object.values(TodoEnum)),
    allowNull: false,
    defaultValue: TodoEnum.Todo,
  })
  status: TodoEnum;

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
