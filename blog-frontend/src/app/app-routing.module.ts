import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogsComponent} from '@root/components/blogs/blogs.component';
import {BlogComponent} from '@root/components/blog/blog.component';
import {LoginComponent} from '@root/components/login/login.component';
import {NewComponent} from '@root/components/new/new.component';
import {AboutComponent} from '@root/components/about/about.component';
import {EditComponent} from '@root/components/edit/edit.component';
import {ExperimentsComponent} from '@root/components/experiments/experiments.component';
import {StatusComponent} from '@root/components/status/status.component';

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
    component: EditComponent,
    path: 'blogs/:id/edit'
  },
  {
    component: AboutComponent,
    path: 'about'
  },
  {
    component: ExperimentsComponent,
    path: 'experiments'
  },
  {
    component: StatusComponent,
    path: 'status'
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
