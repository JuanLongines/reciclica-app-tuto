import {enableProdMode, importProvidersFrom} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { loadingFeature } from './app/store/loading/loading.reducers';
import { loginFeature } from './app/store/login/login.reducers';
import {AngularFireModule} from "@angular/fire/compat";
import { getApp } from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideStore(),
    provideState(loadingFeature),
    provideState(loginFeature),
    importProvidersFrom([
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule
    ]),
    provideStoreDevtools({
      maxAge: 25
    })
  ],
});
