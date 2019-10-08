import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {mapTo, mergeMap, mergeMapTo, take} from 'rxjs/operators';
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

  add(title: string): Observable<ListItemModel> {
    let newItem = ListItemModel.createByTitle(title);
    return fromPromise(this.firestoreService.create(newItem))
      .pipe(mapTo(newItem));
  }

  update(item: ListItemModel): Observable<ListItemModel> {
    return fromPromise(this.firestoreService.update(item))
      .pipe(mapTo(item));
  }

  removeMarked(): Observable<Array<ListItemModel>> {
    return this.firestoreService.collection$().pipe(
      take(1),
      mergeMap(items => {
        let markedItemIds = items.filter(item => item.marked).map(item => item.id);
        return this.firestoreService.delete(markedItemIds);
      }),
      mergeMapTo(this.firestoreService.collection$()),
      take(1)
    );
  }

  remove(item: ListItemModel): Observable<ListItemModel> {
    return fromPromise(this.firestoreService.delete(item.id))
      .pipe(mapTo(item));
  }
}
