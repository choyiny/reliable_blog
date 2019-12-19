import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './includes/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { PreviewComponent } from './includes/preview/preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewComponent } from './components/new/new.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogsComponent,
    BlogComponent,
    PreviewComponent,
    LoginComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
