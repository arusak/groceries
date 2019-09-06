import {Injectable} from '@angular/core';
import {BaseFirestoreService} from '../../base/base-firestore.service';
import {SimpleListItemModel} from '../../models/simple-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleFirestoreService extends BaseFirestoreService<SimpleListItemModel> {
  protected basePath = '/Simple';
}
