import {Component, Input, OnInit} from '@angular/core';
import {Post} from '@root/models/post';

@Component({
  selector: 'app-blog-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() public post: Post;

  constructor() { }

  ngOnInit() {
  }

}
