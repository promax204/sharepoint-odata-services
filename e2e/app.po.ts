export class SharepointOdataServicesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sharepoint-odata-services-app h1')).getText();
  }
}
