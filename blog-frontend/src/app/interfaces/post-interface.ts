export interface PostInterface {
  id?: number;
  title: string;
  content: string;

  author?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
