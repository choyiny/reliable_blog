import {Table, Column, Model, HasMany, HasOne, BelongsTo, CreatedAt, UpdatedAt, ForeignKey, Scopes} from 'sequelize-typescript';
import {Comment} from './Comment';
import {Post} from './Post';
@Table
export class User extends Model<User>{
  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @Column
  email!: string;

  @HasMany(() => Post)
  posts!: Post[];

  @HasMany(() => Comment)
  comments!: Comment[];

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  middleName?: string;
}
