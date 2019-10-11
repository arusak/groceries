import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ListItemModel} from '../../../models/list-item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() list: Array<ListItemModel>;
  @Output() updateItem = new EventEmitter<ListItemModel>();
  @Output() removeItem = new EventEmitter<ListItemModel>();

  mark(item: ListItemModel, checked: boolean) {
    this.updateItem.emit(ListItemModel.update(item, {marked: checked}));
  }
}
