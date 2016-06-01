import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AsyncPipe, JsonPipe, COMMON_DIRECTIVES } from '@angular/common';

import {HttpService, SPList} from '../http.service';
import {ListDetailsComponent} from '../list-details';


@Component({
  moduleId: module.id,
  selector: 'app-sp-lists',
  templateUrl: 'sp-lists.component.html',
  styleUrls: [ 'sp-lists.component.css' ],
  pipes: [ AsyncPipe, JsonPipe ],
  directives: [ COMMON_DIRECTIVES, ListDetailsComponent ]
})
export class SpListsComponent implements OnInit {
  lists$: Observable<SPList[]>;
  selectedListId$ = new BehaviorSubject('');
  constructor(private httpService: HttpService) { }
  displayListDetails(listId: string) {
    this.selectedListId$.next(listId);
  }
  ngOnInit() {
    this.lists$ = this.httpService.getLists();
  }

}
