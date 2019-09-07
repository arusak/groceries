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

  add(title: string): Observable<Array<HistoryItemModel>> {
    let newItem = HistoryItemModel.createByTitle(title);
    return fromPromise(this.firestoreService.create(newItem))
      .pipe(mergeMapTo(this.firestoreService.collection$()));
  }
}
