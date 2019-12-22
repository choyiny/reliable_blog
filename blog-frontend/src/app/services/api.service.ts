import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {PostInterface} from '@root/interfaces/post-interface';
import {ApiEndpointService} from '@root/services/api-endpoint.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private endpointService: ApiEndpointService,
    private http: HttpClient
  ) { }

  newPost(title: string, content: string): Observable<PostInterface> {
    return this.http.post(this.endpointService.urlFor('create_post'), {title, content}).pipe(
      map((obj) => obj as PostInterface)
    );
  }

  getPosts(): Observable<PostInterface[]> {
    return this.http.get(this.endpointService.urlFor('get_posts')).pipe(
      map((obj: PostInterface[]) => obj)
    );
  }

  getPost(postId: string): Observable<PostInterface> {
    return this.http.get(this.endpointService.urlFor('get_post', {postId: postId})).pipe(
      map((obj) => obj as PostInterface)
    );
  }

}
