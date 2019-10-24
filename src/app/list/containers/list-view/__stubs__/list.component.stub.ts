import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListItemModel} from '../../../../models/list-item.model';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-list',
  template: ''
})
export class ListComponentStub {
  @Input() list: Array<ListItemModel>;
  @Output() updateItem = new EventEmitter<ListItemModel>();
  @Output() removeItem = new EventEmitter<ListItemModel>();
}
