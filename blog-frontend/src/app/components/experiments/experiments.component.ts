import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiEndpointService} from '@root/services/api-endpoint.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss']
})
export class ExperimentsComponent implements OnInit {
  backendForm: FormGroup;

  constructor(
    private endpointService: ApiEndpointService,
    private fb: FormBuilder
  ) {
    this.backendForm = this.fb.group({
      backendUrl: [this.endpointService.baseUrl, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  changeBackend() {
    this.endpointService.baseUrl = this.backendForm.value.backendUrl;
  }
}
