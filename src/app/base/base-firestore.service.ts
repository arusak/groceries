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
    @Inject(AngularFirestore) protected firestore: AngularFirestore,
  ) {

  }

  doc$(id: string): Observable<T> {
    return this.firestore.doc<T>(`${this.basePath}/${id}`).valueChanges()
      .pipe(tap(doc => this.groupLog(`Firestore Streaming [${this.basePath}] [doc$] ${id}`, doc)));
  }

  collection$(queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(`${this.basePath}`, queryFn).valueChanges()
      .pipe(tap(collection => this.groupLog(`Firestore Streaming [${this.basePath}] [collection$]`, collection)),);
  }

  create(value: T): Promise<any> {
    const id = this.firestore.createId();
    return this.collection.doc(id).set(Object.assign({}, {id}, value))
      .then(() => this.groupLog(`Firestore Service [${this.basePath}] [create]`, '[Id]', id, value));
  }

  update(item: T): Promise<any> {
    return this.collection.doc(item.id).update(Object.assign({}, item))
      .then(() => this.groupLog(`Firestore Service [${this.basePath}] [update]`, '[Id]', item.id, item));
  }

  delete(id: string): Promise<any> {
    return this.collection.doc(id).delete()
      .then(() => this.groupLog(`Firestore Service [${this.basePath}] [delete]`, '[Id]', id));
  }

  private get collection() {
    return this.firestore.collection<T>(`${this.basePath}`);
  }

  private groupLog(title: string, ...content: any) {
    if (!environment.production) {
      console.groupCollapsed(title);
      console.log(content);
      console.groupEnd();
    }
  }
}
