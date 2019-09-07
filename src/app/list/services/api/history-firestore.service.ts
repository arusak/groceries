import {Injectable} from '@angular/core';
import {BaseFirestoreService} from '../../../base/base-firestore.service';
import {HistoryItemModel} from '../../../models/history-item.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryFirestoreService extends BaseFirestoreService<HistoryItemModel> {
  protected basePath = '/History';
}
