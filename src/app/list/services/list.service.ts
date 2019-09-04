import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ListItemModel} from '../../models/list-item.model';
import {SimpleListItemModel} from '../../models/simple-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listRef: AngularFirestoreCollection<ListItemModel> = null;

  private list: SimpleListItemModel[];

  constructor(private db: AngularFirestore) {
    this.listRef = db.collection('/List');
    this.list = JSON.parse(localStorage.getItem('list')) || [];
  }

  getList(): Observable<Array<ListItemModel>> {
    return this.listRef.snapshotChanges().pipe(
      map(changes => {
          // console.log(changes[0].payload.doc);
          return changes.map(c => new ListItemModel({id: c.payload.doc.id, ...c.payload.doc.data()}));
        }
      )
    );
  }

  getSimpleList(): Observable<Array<SimpleListItemModel>> {
    return of(this.list);
  }

  addSimple(title: string): Observable<Array<SimpleListItemModel>> {
    let newItem = {title, quantity: 1, marked: false};
    this.list.push(newItem);
    this.persist();
    return of(this.list);
  }

  updateSimple(item: SimpleListItemModel): Observable<Array<SimpleListItemModel>> {
    let found = this.list.findIndex(i => i.title === item.title);
    if (found >= 0) {
      this.list[found] = item;
      this.persist();
    }
    return of(this.list);
  }

  removeSimple(item: SimpleListItemModel): Observable<Array<SimpleListItemModel>> {
    let found = this.list.findIndex(i => i === item);
    if (found >= 0) {
      this.list.splice(found, 1);
      this.persist();
    }
    return of(this.list);
  }

  private persist() {
    localStorage.setItem('list', JSON.stringify(this.list));
  }

}
