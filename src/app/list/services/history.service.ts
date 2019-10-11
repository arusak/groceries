import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {mergeMapTo} from 'rxjs/operators';
import {HistoryItemModel} from '../../models/history-item.model';
import {HistoryFirestoreService} from './api/history-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private firestoreService: HistoryFirestoreService) {
  }

  getAll(): Observable<Array<HistoryItemModel>> {
    return this.firestoreService.collection$();
  }

  add(title: string): Observable<HistoryItemModel> {
    let newItem = HistoryItemModel.createByTitle(title);
    return fromPromise(this.firestoreService.create(newItem));
  }

  update(item: HistoryItemModel): Observable<HistoryItemModel> {
    return fromPromise(this.firestoreService.update(item))
      .pipe(mergeMapTo(this.firestoreService.doc$(item.id)));
  }
}
