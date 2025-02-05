import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {dataReducer} from './store/reducers/data.reducer';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {filterReducer} from './store/reducers/filter.reducer';
import {historyReducer} from './store/reducers/history.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      data: dataReducer,
      filteredData: filterReducer,
      history: historyReducer
    }),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
