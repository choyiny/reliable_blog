import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import {environment} from '../../environments/environment';
// @ts-ignore
import { version } from '../../../package.json';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
    if (!!environment.settings.sentry_dsn) {
      Sentry.init({
        dsn: environment.settings.sentry_dsn,
        release: 'blog-frontend@' + version
      });
    }
  }

  handleError(error): void {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}
