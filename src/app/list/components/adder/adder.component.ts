import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HistoryItemModel} from '../../../models/history-item.model';
import {historyActions} from '../../list-store/actions/history.actions';
import {addToList} from '../../list-store/actions/list.actions';
import {selectFilteredHistoryItems} from '../../list-store/selectors/history.selectors';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdderComponent implements OnInit {
  userInput: string;
  history$: Observable<Array<HistoryItemModel>>;

  constructor(private store: Store<any>) {
    this.history$ = store.select(selectFilteredHistoryItems);
  }

  ngOnInit() {
  }

  addFromInput(title: string) {
    this.store.dispatch(addToList({title}));
    this.store.dispatch(historyActions.add({title}));
  }

  addItem(item: HistoryItemModel) {
    this.store.dispatch(addToList({title: item.title}));
    this.store.dispatch(historyActions.updateItem({item: HistoryItemModel.increaseCount(item)}));
  }

  onUserInput() {
    this.store.dispatch(historyActions.changeFilter({term: this.userInput.trim()}));
  }
}
