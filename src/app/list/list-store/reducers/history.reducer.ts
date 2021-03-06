import {createReducer, on} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';
import {historyApiActions} from '../actions/history-api.actions';
import {historyActions} from '../actions/history.actions';

export interface HistoryState {
  items: Array<HistoryItemModel>,
  filter: string,
  loading: boolean,
  error?: string
}

export const initialHistoryState: HistoryState = {
  items: [],
  filter: '',
  loading: false,
  error: null
};

export const historyReducer = createReducer(
  initialHistoryState,

  on(
    historyActions.add,
    historyActions.update,
    state => {
      return {
        ...state,
        error: null
      };
    }
  ),

  on(historyApiActions.addError, (state) => {
    return {
      ...state,
      error: 'Error adding a new item'
    };
  }),

  on(historyActions.getAll, state => {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
  ),

  on(historyApiActions.getAllSuccess, (state, {items}) => {
    return {
      ...state,
      loading: false,
      items: [...items]
    };
  }),

  on(historyApiActions.getAllError, (state) => {
    return {
      ...state,
      items: [],
      loading: false,
      error: 'Error getting history (check connection)'
    };
  }),

  on(historyActions.changeFilter, (state, {term}) => {
    return {
      ...state,
      filter: term,
    };
  }),
);
