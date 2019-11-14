import {Table, Column, BelongsTo, ForeignKey, Model} from 'sequelize-typescript';
import {User} from './User';
import {Post} from './Post';

@Table
export class Comment extends Model<Comment> {
  @Column
  body!: string;

  @BelongsTo(() => User)
  author!: User;

  @BelongsTo(() => Post)
  post!: Post;

  @ForeignKey(() => User)
  @Column
  authorId!: number;

  @ForeignKey(() => Post)
  @Column
  postId!: number;
}