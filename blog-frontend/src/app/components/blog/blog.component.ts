import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '@root/services/api.service';
import {Post} from '@root/models/post';
import {PostInterface} from '@root/interfaces/post-interface';
import {CurrentUserService} from '@root/services/current-user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public currentUser: CurrentUserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.apiService.getPost(params.get('id')).subscribe((pi: PostInterface) => {
          this.post = new Post(pi);
        });
      }
    });
  }

}
