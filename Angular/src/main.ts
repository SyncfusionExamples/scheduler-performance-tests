// import { registerLicense } from '@syncfusion/ej2-base';
// registerLicense('YOUR_SYNCFUSION_LICENSE_KEY');

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
