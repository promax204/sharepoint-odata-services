import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { AsyncPipe, JsonPipe, COMMON_DIRECTIVES } from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {HttpService} from '../http.service';

@Component({
  moduleId: module.id,
  selector: 'app-list-details',
  templateUrl: 'list-details.component.html',
  styleUrls: [ 'list-details.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDetailsComponent implements OnInit {
  @Input() listId$: Observable<string>;
  listDetails$: Observable<any>;
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.listDetails$ = this.listId$
      .filter(listId => !!listId)
      .flatMap(listId => this.httpService.getList(listId))
  }
  // ngOnChanges() {
  //   console.log('List Details: ' + this.listId);
    
  // }
  // fetchListDetails() {
  //   if (this.listId) {
  //     return this.httpService.getList(this.listId);
  //   } else {
  //     return Observable.empty();
  //   }
  // }

}
