import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { StatusBar, Style } from '@capacitor/status-bar';

if (environment.production) {
  enableProdMode();
}

StatusBar.setStyle({ style: Style.Dark });
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
