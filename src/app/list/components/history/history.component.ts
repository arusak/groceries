import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {HistoryItemModel} from '../../../models/history-item.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {
  @Input() list: Array<HistoryItemModel>;
  @Output() onChoose = new EventEmitter<HistoryItemModel>();

  choose(item: HistoryItemModel) {
    this.onChoose.emit(item);
  }
}
