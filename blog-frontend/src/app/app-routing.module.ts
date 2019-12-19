import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogsComponent} from '@root/components/blogs/blogs.component';
import {BlogComponent} from '@root/components/blog/blog.component';
import {LoginComponent} from '@root/components/login/login.component';

const routes: Routes = [
  {
    component: BlogsComponent,
    path: ''
  },
  {
    component: BlogComponent,
    path: 'blogs/:id'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
