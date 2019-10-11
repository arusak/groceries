import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HistoryItemModel} from '../../../models/history-item.model';
import {NewItemComponent} from '../../components/new-item/new-item.component';
import {historyActions} from '../../list-store/actions/history.actions';
import {listActions} from '../../list-store/actions/list.actions';
import {selectFilteredHistoryItems} from '../../list-store/selectors/history.selectors';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdderComponent {
  @ViewChild(NewItemComponent, {static: false}) newItemComponent: NewItemComponent;
  readonly titleMaxLength = 40;
  history$: Observable<Array<HistoryItemModel>>;

  constructor(private store: Store<any>) {
    this.history$ = store.select(selectFilteredHistoryItems);
  }

  addFromInput(title: string) {
    this.addItem(title, historyActions.add({title}));
  }

  addFromHistory(item: HistoryItemModel) {
    this.addItem(item.title, historyActions.updateItem({item: HistoryItemModel.increaseCount(item)}));
  }

  updateFilter(term) {
    this.store.dispatch(historyActions.changeFilter({term}));
  }

  private addItem(title: string, historyAction: Action) {
    this.store.dispatch(listActions.addToList({title}));
    this.store.dispatch(historyAction);
    this.newItemComponent.resetFilter();
  }
}
