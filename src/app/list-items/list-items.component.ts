import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AsyncPipe, JsonPipe, COMMON_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import {keys} from 'lodash';

import {HttpService} from '../http.service';
import {ListItemFormComponent} from '../list-item-form';



@Component({
  moduleId: module.id,
  selector: 'app-list-items',
  templateUrl: 'list-items.component.html',
  styleUrls: [ 'list-items.component.css' ],
  pipes: [ AsyncPipe ],
  directives: [COMMON_DIRECTIVES, ListItemFormComponent, FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemsComponent implements OnInit {
  listId = 'a290086b-2d43-4151-add4-893474a930a9';
  keys: string[] = [];
  listItems$: Observable<any[]>;
  listName$ = new BehaviorSubject('');
  selectedListItem$ = new BehaviorSubject('');
  constructor(private httpService: HttpService) { }

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
    this.listName$.next(listName);
  }
  onCancel() {
    this.selectedListItem$.next('');
  }
  onSave(listItem: Object) {
    this.httpService.saveListItem(listItem);
    this.onCancel();
  }
  selectListItem(listItem) {
    this.selectedListItem$.next(listItem);
  }

}
