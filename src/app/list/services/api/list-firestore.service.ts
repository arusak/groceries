import {Injectable} from '@angular/core';
import {BaseFirestoreService} from '../../../base/base-firestore.service';
import {ListItemModel} from '../../../models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListFirestoreService extends BaseFirestoreService<ListItemModel> {
  protected basePath = '/List';
}
