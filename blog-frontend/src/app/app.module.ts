import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './includes/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlogsComponent} from './components/blogs/blogs.component';
import {BlogComponent} from './components/blog/blog.component';
import {PreviewComponent} from './includes/preview/preview.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NewComponent} from './components/new/new.component';
import {AboutComponent} from './components/about/about.component';
import {IdentityInterceptor} from '@root/interceptors/identity.interceptor';
import {QuillModule} from 'ngx-quill';
import { FooterComponent } from './includes/footer/footer.component';
import { EditComponent } from './components/edit/edit.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { StatusComponent } from './components/status/status.component';
import {SentryErrorHandler} from '@root/interceptors/sentry.error-handler';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogsComponent,
    BlogComponent,
    PreviewComponent,
    LoginComponent,
    NewComponent,
    AboutComponent,
    FooterComponent,
    EditComponent,
    ExperimentsComponent,
    StatusComponent,
    DashboardComponent
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
    MatInputModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],

          [{ list: 'ordered'}, { list: 'bullet' }],
          [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
          [{ color: [] }, { background: [] }],
          [{ align: [] }],

          ['clean'],

          ['link', 'image', 'video', 'formula']
        ]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IdentityInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
