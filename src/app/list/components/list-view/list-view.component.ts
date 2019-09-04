import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, pluck} from 'rxjs/operators';
import {ErrorService} from '../../../core/error.service';
import {SimpleListItemModel} from '../../../models/simple-list-item.model';
import {remove, update} from '../../actions/list.actions';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass']
})
export class ListViewComponent implements OnInit {
  title$: Observable<string>;
  list$: Observable<Array<SimpleListItemModel>>;
  error$: Observable<string>;

  constructor(private errorService: ErrorService, private store: Store<any>) {
    this.title$ = this.store.select('title');
    this.list$ = this.store.select('list').pipe(pluck('items'));
    this.error$ = this.store.select('list').pipe(pluck('error'), filter(v => v !== undefined));
  }

  ngOnInit() {
    this.error$.subscribe(error => this.errorService.showError(error));
  }

  removeItem(item: SimpleListItemModel) {
    this.store.dispatch(remove({item: item}));
  }

  markItem(item: SimpleListItemModel, checked: boolean) {
    this.store.dispatch(update({item: {...item, marked: checked}}));
  }
}
