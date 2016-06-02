import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-list-item-form',
  templateUrl: 'list-item-form.component.html',
  styleUrls: [ 'list-item-form.component.css' ],
  directives: [FORM_DIRECTIVES]
})
export class ListItemFormComponent implements OnInit {
  @Input() listItem: Object;
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.listItem);
  }

}
