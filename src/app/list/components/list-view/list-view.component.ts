import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, pluck, takeUntil} from 'rxjs/operators';
import {BasePage} from '../../../base/base.page';
import {ErrorService} from '../../../core/error.service';
import {ListItemModel} from '../../../models/list-item.model';
import {remove, update} from '../../actions/list.actions';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListViewComponent extends BasePage implements OnInit {
  items$: Observable<Array<ListItemModel>>;
  error$: Observable<string>;

  constructor(private errorService: ErrorService, private store: Store<any>) {
    super();

    let list$ = this.store.select('list').pipe(takeUntil(this.unsubscribe$));
    this.items$ = list$.pipe(pluck('items'));
    this.error$ = list$.pipe(pluck('error'), filter(v => v !== undefined));
  }

  ngOnInit() {
    this.error$.subscribe(error => this.errorService.showError(error));
  }

  removeItem(item: ListItemModel) {
    this.store.dispatch(remove({item: item}));
  }

  markItem(item: ListItemModel, checked: boolean) {
    this.store.dispatch(update({item: {...item, marked: checked}}));
  }
}
