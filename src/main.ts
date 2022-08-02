import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { defineCustomElements } from "@duetds/date-picker/dist/loader";

//import { AppModule } from './app/shared/menu-componets/app.module';
import { environment } from './environments/environment';

defineCustomElements(window);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
