import { SharepointOdataServicesPage } from './app.po';

describe('sharepoint-odata-services App', function() {
  let page: SharepointOdataServicesPage;

  beforeEach(() => {
    page = new SharepointOdataServicesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sharepoint-odata-services works!');
  });
});
