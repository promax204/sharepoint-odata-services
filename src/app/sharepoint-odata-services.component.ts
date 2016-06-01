import { Component, provide, OnInit } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import {HTTP_PROVIDERS, Headers, Http, BaseRequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {HttpService} from './http.service';
import {SpListsComponent} from './sp-lists';
import {ListItemsComponent} from './list-items';



@Component({
  moduleId: module.id,
  selector: 'sharepoint-odata-services-app',
  templateUrl: 'sharepoint-odata-services.component.html',
  styleUrls: [ 'sharepoint-odata-services.component.css' ],
  directives: [SpListsComponent, COMMON_DIRECTIVES, ListItemsComponent],
  providers: [
    HTTP_PROVIDERS,
    HttpService,
  ]
})
export class SharepointOdataServicesAppComponent implements OnInit {
  showLists = false;
  constructor(private httpService: HttpService) { }
  title = 'sharepoint-odata-services works!';
  ngOnInit() {

  }
}
