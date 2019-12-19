import { Component, OnInit } from '@angular/core';
import {Post} from '@root/models/post';
import {ApiService} from '@root/services/api.service';
import {PostInterface} from '@root/interfaces/post-interface';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  posts: Post[];
  loading = true;

  constructor(private apiService: ApiService) {
    this.apiService.getPosts().subscribe((posts: PostInterface[]) => {
      this.posts = posts.map((pi: PostInterface) => new Post(pi));
      this.loading = false;
    });
  }

  ngOnInit() {}

}
