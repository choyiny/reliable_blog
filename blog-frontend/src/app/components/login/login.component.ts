import { Component, OnInit } from '@angular/core';
import {CurrentUserService} from '@root/services/current-user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalid = false;

  constructor(
    private userService: CurrentUserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.invalid = false;
      this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((success) => {
        if (success) {
          this.router.navigate(['']);
        } else {
          this.invalid = true;
        }
      }, () => { this.invalid = true; });
    }
  }

  ngOnInit() {
  }



}
