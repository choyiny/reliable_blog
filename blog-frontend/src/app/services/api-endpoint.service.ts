import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  public readonly defaultUrl = environment.apiRootUrl;

  private _baseUrl: string;

  public get baseUrl() {
    return this._baseUrl;
  }

  public set baseUrl(url: string) {
    this._baseUrl = url;
    localStorage.setItem('baseUrl', url);
  }

  public endpoints: {[endpoint: string]: string} = {
    auth: '/authenticate',
    create_post: '/posts',
    get_post: '/posts/{{postId}}',
    get_posts: '/posts',
    edit_post: '/posts/{{postId}}',
    dashboard: '/dashboard'
  };

  constructor() {
    if (!localStorage.getItem('baseUrl')) {
      localStorage.setItem('baseUrl', this.defaultUrl);
    }
    this.baseUrl = localStorage.getItem('baseUrl');
  }

  urlFor(endpoint: string, urlParams?: object): string {
    return this.urlBuilder(this.baseUrl + this.endpoints[endpoint], urlParams);
  }

  private urlBuilder(url: string, urlParams?: object) {
    for (const param in urlParams) {
      if (urlParams.hasOwnProperty(param)) {
        const replacement = '{{' + param + '}}';
        if (url.indexOf(replacement) !== -1) {
          url = url.replace(replacement, urlParams[param].toString());
        }
      }
    }
    return url;
  }
}
