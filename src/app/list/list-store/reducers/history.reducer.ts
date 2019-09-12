import {createReducer, on} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';
import {historyApiActions} from '../actions/history-api.actions';
import {historyActions} from '../actions/history.actions';

export interface HistoryState {
  items: Array<HistoryItemModel>,
  filter: string,
  error?: string
}

export const initialHistoryState: HistoryState = {
  items: [],
  filter: '',
  error: undefined
};

export const historyReducer = createReducer(
  initialHistoryState,
  on(historyApiActions.addSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(historyApiActions.addError, (state) => {
    return {
      ...state,
      error: 'Error adding a new item'
    };
  }),
  on(historyApiActions.getAllSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(historyApiActions.getAllError, (state) => {
    return {
      ...state,
      items: [],
      error: 'Error getting history (check connection)'
    };
  }),
  on(historyActions.changeFilter, (state, {term}) => {
    return {
      ...state,
      filter: term,
    };
  }),
  on(historyApiActions.updateSuccess, (state, {item}) => {
    let itemPos = state.items.findIndex(cur => cur.id === item.id);
    let items = state.items.slice(0);
    items[itemPos] = item;
    return {
      ...state,
      items
    };
  }),
);
