import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HistoryItemModel} from '../../../models/history-item.model';
import {historyActions} from '../../list-store/actions/history.actions';
import {listActions} from '../../list-store/actions/list.actions';
import {selectFilteredHistoryItems} from '../../list-store/selectors/history.selectors';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdderComponent implements OnInit {
  userInput: string;
  readonly titleMaxLength = 40;
  history$: Observable<Array<HistoryItemModel>>;

  constructor(private store: Store<any>) {
    this.history$ = store.select(selectFilteredHistoryItems);
  }

  ngOnInit() {
  }

  addFromInput(title: string) {
    // trim whitespace, capitalize 1st word, trim to max length
    title = title.trim();
    title = title.charAt(0).toLocaleUpperCase() + title.substr(1);
    title = title.substr(0, this.titleMaxLength);
    this.addItem(title, historyActions.add({title}));
  }

  addFromHistory(item: HistoryItemModel) {
    this.addItem(item.title, historyActions.updateItem({item: HistoryItemModel.increaseCount(item)}));
  }

  onUserInput() {
    this.store.dispatch(historyActions.changeFilter({term: this.userInput.trim()}));
  }

  private addItem(title: string, historyAction: Action) {
    this.store.dispatch(listActions.addToList({title}));
    this.store.dispatch(historyAction);
    this.userInput = '';
  }
}
