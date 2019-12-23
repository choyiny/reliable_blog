import {PostInterface} from '@root/interfaces/post-interface';

export class Post implements PostInterface {
  id?: number;
  title: string;
  content: string;

  author?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(json: PostInterface) {
    this.id = json.id;
    this.title = json.title;
    this.createdAt = json.createdAt || new Date();
    this.updatedAt = json.updatedAt || new Date();
    this.content = json.content;
    this.author = json.author;
  }

  toJSON(): object {
    return {
      title: this.title,
      content: this.content
    };
  }

}
