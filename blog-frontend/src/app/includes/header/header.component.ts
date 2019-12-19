import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '@root/services/current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: CurrentUserService) { }

  ngOnInit() {
  }

}
