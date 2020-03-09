import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PostInterface} from '@root/interfaces/post-interface';
import {ApiEndpointService} from '@root/services/api-endpoint.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currentQueryId: string;

  constructor(
    private endpointService: ApiEndpointService,
    private http: HttpClient
  ) { }

  newPost(title: string, content: string): Observable<PostInterface> {
    return this.http.post(this.endpointService.urlFor('create_post'), {title, content}).pipe(
      map((obj) => obj as PostInterface)
    );
  }

  editPost(id: number, title: string, content: string): Observable<PostInterface> {
    return this.http.put(this.endpointService.urlFor('edit_post', {postId: id}), {id, title, content}).pipe(
      map((obj) => obj as PostInterface)
    );
  }

  getPosts(searchParam?: string): Observable<PostInterface[]> {
    const params = new HttpParams().set('query', searchParam || '');
    return this.http.get(this.endpointService.urlFor('get_posts'), {params}).pipe(
      map((obj: {posts: PostInterface[], query_id: string}) => {
        this.currentQueryId = obj.query_id;
        return obj.posts.map((post) => post as PostInterface);
      })
    );
  }

  getPost(postId: string): Observable<PostInterface> {
    const params = new HttpParams().set('query_id', this.currentQueryId || '');
    return this.http.get(this.endpointService.urlFor('get_post', {postId}), {params}).pipe(
      map((obj) => obj as PostInterface)
    );
  }

  getStatistics(searchTerm: string, postId: string) {
    const params = new HttpParams().set('searchTerm', searchTerm).set('postId', postId);
    return this.http.get(this.endpointService.urlFor('dashboard'), {params});
  }

}
