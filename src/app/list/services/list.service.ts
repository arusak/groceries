import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {mergeMapTo} from 'rxjs/operators';
import {ListItemModel} from '../../models/list-item.model';
import {ListFirestoreService} from './api/list-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private firestoreService: ListFirestoreService) {
  }

  getList(): Observable<Array<ListItemModel>> {
    return this.firestoreService.collection$();
  }

  add(title: string): Observable<Array<ListItemModel>> {
    let newItem = ListItemModel.createByTitle(title);
    return fromPromise(this.firestoreService.create(newItem))
      .pipe(mergeMapTo(this.firestoreService.collection$()), take(1));
  }

  update(item: ListItemModel): Observable<Array<ListItemModel>> {
    return fromPromise(this.firestoreService.update(item))
      .pipe(mergeMapTo(this.firestoreService.collection$()), take(1));
  }

  remove(item: ListItemModel): Observable<Array<ListItemModel>> {
    return fromPromise(this.firestoreService.delete(item.id))
      .pipe(mergeMapTo(this.firestoreService.collection$()), take(1));
  }
}
