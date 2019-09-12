import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HistoryItemModel} from '../../../models/history-item.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent implements OnInit {
  @Input() list: Array<HistoryItemModel>;
  @Output() onChoose = new EventEmitter<HistoryItemModel>();

  constructor() {
  }

  ngOnInit() {
  }

  choose(item: HistoryItemModel) {
    this.onChoose.emit(item);
  }
}
