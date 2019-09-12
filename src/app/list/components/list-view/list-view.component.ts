import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {BasePage} from '../../../base/base.page';
import {ErrorService} from '../../../core/error.service';
import {ListItemModel} from '../../../models/list-item.model';
import {remove, update} from '../../list-store/actions/list.actions';
import {selectListError, selectListItems} from '../../list-store/selectors/list.selectors';

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

    this.items$ = this.store.select(selectListItems).pipe(takeUntil(this.unsubscribe$));
    this.error$ = this.store.select(selectListError).pipe(takeUntil(this.unsubscribe$), filter((v: string) => v !== undefined));
  }

  ngOnInit() {
    this.error$.subscribe(error => this.errorService.showError(error));
  }

  removeItem(item: ListItemModel) {
    this.store.dispatch(remove({item: item}));
  }

  updateItem(item: ListItemModel) {
    this.store.dispatch(update({item}));
  }
}
