import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SimpleListItemModel} from '../../models/simple-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class LocalListService {
  private list: SimpleListItemModel[];

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
