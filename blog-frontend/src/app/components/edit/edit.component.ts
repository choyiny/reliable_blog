import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@root/services/api.service';
import {PostInterface} from '@root/interfaces/post-interface';
import {Post} from '@root/models/post';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  post: Post;
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.editForm.valid) {
      this.apiService.editPost(this.post.id, this.editForm.value.title, this.editForm.value.content).subscribe(
        (post: PostInterface) => {
          this.router.navigate([`blogs/${this.post.id}`]);
        }
      );
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.apiService.getPost(params.get('id')).subscribe((pi: PostInterface) => {
          this.post = new Post(pi);
          this.editForm.patchValue(this.post);
        });
      }
    });
  }

}
