import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {PostInterface} from '@root/interfaces/post-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  newPost(): Observable<PostInterface> {
    return of(
      {
        id: 1,
        title: 'Hello World',
        content: 'Lorem Ipsum Jordan is a placeholder. Lorem Ipsum Jordan is a placeholder.',
        author: 'Jordan Liu'
      }
    );
  }

  getPosts(): Observable<PostInterface[]> {
    return of([
      {
        id: 1,
        title: 'Hello World',
        content: 'Lorem Ipsum Jordan is a placeholder. Lorem Ipsum Jordan is a placeholder.',
        author: 'Jordan Liu'
      }
    ]);
  }

  getPost(postId: string): Observable<PostInterface> {
    return of(
      {
        id: 1,
        title: 'Hello World',
        content: 'Lorem Ipsum Jordan is a placeholder. Lorem Ipsum Jordan is a placeholder.',
        author: 'Jordan Liu'
      }
    );
  }

}
