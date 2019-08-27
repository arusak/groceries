import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ListItem} from '../../models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listRef: AngularFirestoreCollection<ListItem> = null;

  constructor(private db: AngularFirestore) {
    this.listRef = db.collection('/List');
  }

  getList(): Observable<Array<ListItem>> {
    return this.listRef.snapshotChanges().pipe(
      map(changes => {
          // console.log(changes[0].payload.doc);
          return changes.map(c => new ListItem({id: c.payload.doc.id, ...c.payload.doc.data()}));
        }
      )
    );
  }

}
