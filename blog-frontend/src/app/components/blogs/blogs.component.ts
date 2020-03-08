import { Component, OnInit } from '@angular/core';
import {Post} from '@root/models/post';
import {ApiService} from '@root/services/api.service';
import {PostInterface} from '@root/interfaces/post-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, skip} from 'rxjs/operators';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  searchedPosts: Post[];

  posts: Post[];
  loading = true;

  searchForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.apiService.getPosts().subscribe((posts: PostInterface[]) => {
      this.posts = posts.map((pi: PostInterface) => new Post(pi));
      this.loading = false;
    });

    this.searchForm = this.fb.group({
      search: ['']
    });

    this.searchForm.controls.search.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.apiService.getPosts(value).subscribe((posts: PostInterface[]) => {
        this.searchedPosts = posts.map((pi: PostInterface) => new Post(pi));
      });
    });
  }

  ngOnInit() {}

}
