import {Inject} from '@angular/core';
import {AngularFirestore, QueryFn} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

/**
 * @see https://www.toptal.com/angular/state-management-in-angular-using-firebase
 */
export abstract class BaseFirestoreService<T extends { id?: string }> {

  protected abstract basePath: string;

  constructor(
    @Inject(AngularFirestore) protected db: AngularFirestore,
  ) {

  }

  doc$(id: string): Observable<T> {
    return this.db.doc<T>(`${this.basePath}/${id}`).valueChanges()
      .pipe(tap(doc => this.groupLog(`Firestore Streaming [${this.basePath}] [doc$] ${id}`, doc)));
  }

  collection$(queryFn?: QueryFn): Observable<T[]> {
    return this.db.collection<T>(`${this.basePath}`, queryFn).valueChanges()
      .pipe(tap(collection => this.groupLog(`Firestore Streaming [${this.basePath}] [collection$]`, collection)),);
  }

  create(value: T): Promise<any> {
    const id = this.db.createId();
    const doc = {...value, id};
    return this.collection.doc(id).set(doc)
      .then(() => this.groupLog(`Firestore Service [${this.basePath}] [create]`, '[Id]', id, value));
  }

  update(item: T): Promise<any> {
    return this.collection.doc(item.id).update({...item})
      .then(() => this.groupLog(`Firestore Service [${this.basePath}] [update]`, '[Id]', item.id, item));
  }

  delete(id: string): Promise<any>;
  delete(ids: string[]): Promise<any>;
  delete(arg: string | string[]): Promise<any> {
    if (Array.isArray(arg)) {
      return this.deleteMany(arg);
    } else {
      return this.deleteSingle(arg);
    }
  }

  private deleteSingle(id: string): Promise<any> {
    return this.collection.doc(id).delete()
      .then(() => this.groupLog(`Firestore Service [${this.basePath}] [delete]`, '[Id]', id));
  }

  private deleteMany(ids: string[]): Promise<any> {
    const batch = this.db.firestore.batch();
    ids.forEach(id => {
      let doc = this.collection.doc(id);
      return batch.delete(doc.ref);
    });

    return batch.commit()
      .then(() => this.groupLog(`Firestore Service [${this.basePath}] [delete]`, '[Ids]', ids));
  }

  private get collection() {
    return this.db.collection<T>(`${this.basePath}`);
  }

  private groupLog(title: string, ...content: any) {
    if (!environment.production) {
      console.groupCollapsed(title);
      console.log(...content);
      console.groupEnd();
    }
  }
}
