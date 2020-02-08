import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '@root/services/current-user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public currentUser: CurrentUserService) { }

  ngOnInit() {
  }

}
