import {Table, Column, Model, HasMany, HasOne, BelongsTo, CreatedAt, UpdatedAt, ForeignKey, Scopes} from 'sequelize-typescript';
import {Comment} from './Comment';
import {User} from './User';
@Table
export class Post extends Model<Post> {
  @Column
  title!: string;

  @Column
  body!: string;

  @HasMany(() => Comment)
  comments!: Comment[];

  @BelongsTo(() => User)
  author!: User;

  @ForeignKey(() => User)
  @Column
  authorId!: number;
}