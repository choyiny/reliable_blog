import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogsComponent} from '@root/components/blogs/blogs.component';
import {BlogComponent} from '@root/components/blog/blog.component';
import {LoginComponent} from '@root/components/login/login.component';
import {NewComponent} from '@root/components/new/new.component';

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
    component: NewComponent,
    path: 'new'
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
