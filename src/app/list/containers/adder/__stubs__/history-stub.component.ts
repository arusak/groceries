import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HistoryItemModel} from '../../../../models/history-item.model';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({selector: 'app-history', template: ''})
export class HistoryStubComponent {
  @Input() list: Array<HistoryItemModel>;
  @Output() onChoose = new EventEmitter<HistoryItemModel>();
}
