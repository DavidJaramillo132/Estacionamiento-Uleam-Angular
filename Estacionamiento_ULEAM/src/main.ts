import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';

// inicializa la aplicación Angular
// bootstrapApplication es una función que arranca la aplicación Angular con componentes standalone
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    ...(appConfig.providers || [])
  ]
}).catch((err) => console.error(err));