import {Sequelize} from 'sequelize-typescript';
import {User} from './models/User';
import {Comment} from './models/Comment';
import {Post} from './models/Post';
export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'blog',
  username: 'postgres',
  password: 'password',
  models: [__dirname + '/models']
});
// export const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   database: 'movies',
//   storage: ':memory:',
//   models: [__dirname + '/models']
// });
let author1;
let author2;
let post1;
sequelize.sync({
  force: true,
  logging: console.log
})
.then(() => {
  return User.create({email: "firstperson@email.com", firstName: 'John', lastName: 'Doe'})
})
.then((asdf) => {
  author1 = asdf;
  return User.create({email: "secondperson@email.com", firstName: 'Jane', middleName: 'Smith', lastName: 'Doe'})
})
.then((asdf) => {
  author2 = asdf;
  return Post.create({title: 'post 1', body: 'somebody', authorId: author1.id});
})
.then((asdf) => {
  post1 = asdf;
  return Comment.create({body: 'asdf', post: post1, authorId: author2.id})
});
