import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {mergeMapTo} from 'rxjs/operators';
import {SimpleListItemModel} from '../../models/simple-list-item.model';
import {SimpleFirestoreService} from './simple-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreListService {
  constructor(private firestoreService: SimpleFirestoreService) {
  }

  getSimpleList(): Observable<Array<SimpleListItemModel>> {
    return this.firestoreService.collection$();
  }

  addSimple(title: string): Observable<Array<SimpleListItemModel>> {
    let newItem = {title, quantity: 1, marked: false};
    return fromPromise(this.firestoreService.create(newItem))
      .pipe(mergeMapTo(this.firestoreService.collection$()));
  }

  updateSimple(item: SimpleListItemModel): Observable<Array<SimpleListItemModel>> {
    return fromPromise(this.firestoreService.update(item))
      .pipe(mergeMapTo(this.firestoreService.collection$()));
  }

  removeSimple(item: SimpleListItemModel): Observable<Array<SimpleListItemModel>> {
    return fromPromise(this.firestoreService.delete(item.id))
      .pipe(mergeMapTo(this.firestoreService.collection$()));
  }
}
