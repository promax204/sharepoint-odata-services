import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { SharepointOdataServicesAppComponent } from '../app/sharepoint-odata-services.component';

beforeEachProviders(() => [SharepointOdataServicesAppComponent]);

describe('App: SharepointOdataServices', () => {
  it('should create the app',
      inject([SharepointOdataServicesAppComponent], (app: SharepointOdataServicesAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'sharepoint-odata-services works!\'',
      inject([SharepointOdataServicesAppComponent], (app: SharepointOdataServicesAppComponent) => {
    expect(app.title).toEqual('sharepoint-odata-services works!');
  }));
});
