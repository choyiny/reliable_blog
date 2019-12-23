import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '@root/services/api.service';
import {PostInterface} from '@root/interfaces/post-interface';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  newForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.newForm = this.fb.group({
      title: ['New Post', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.newForm.valid) {
      this.apiService.newPost(this.newForm.value.title, this.newForm.value.content).subscribe(
        (post: PostInterface) => {
          this.router.navigate([`blogs/${post.id}`])
        }
      );
    }
  }

  ngOnInit() {
  }

}
