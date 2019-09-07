import {createReducer, on} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';
import * as HistoryApiActions from '../actions/history-api.actions';

export interface HistoryState {
  items: Array<HistoryItemModel>,
  error?: string
}

export const initialHistoryState: HistoryState = {
  items: [],
  error: undefined
};

export const historyReducer = createReducer(
  initialHistoryState,
  on(HistoryApiActions.addSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(HistoryApiActions.addError, (state) => {
    return {
      ...state,
      error: 'Error adding a new item'
    };
  }),
  on(HistoryApiActions.getAllSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(HistoryApiActions.getAllError, (state) => {
    return {
      ...state,
      items: [],
      error: 'Error getting history (check connection)'
    };
  }),
);
