import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AsyncPipe, JsonPipe, COMMON_DIRECTIVES } from '@angular/common';
import {keys} from 'lodash';

import {HttpService} from '../http.service';


@Component({
  moduleId: module.id,
  selector: 'app-list-items',
  templateUrl: 'list-items.component.html',
  styleUrls: [ 'list-items.component.css' ],
  pipes: [ AsyncPipe ],
  directives: [COMMON_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsComponent implements OnInit {
  keys: string[] = [];
  listItems$: Observable<any[]>;
  listName$ = new BehaviorSubject('');
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    
    this.listItems$ = this.listName$
      .filter(listName => !!listName)
      .distinctUntilChanged()
      .flatMap(listName => this.httpService.getListItems(listName))
      .do(listItems => {
        this.keys = keys(listItems[ 0 ]);
      })
      .share();
    
  }
  getListItems(listName: string) {
    console.log(listName);
    
    this.listName$.next(listName);
  }

}
