import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '@root/services/api.service';
import {Post} from '@root/models/post';
import {PostInterface} from '@root/interfaces/post-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  results: object;
  posts: PostInterface[];

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.dashboardForm = this.fb.group({
      searchParam: [''],
      postId: ['']
    });

    this.api.getPosts().subscribe((posts) => this.posts = posts);
  }

  submit() {
    this.api.getStatistics(this.dashboardForm.value.searchParam, this.dashboardForm.value.postId).subscribe((results) => {
      this.results = results;
    });
  }

  ngOnInit() {
  }

}
