import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from './environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch())]
};

export const BACKEND: String = "http://13.38.66.20:5000";