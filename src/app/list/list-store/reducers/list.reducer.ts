import {createReducer, on} from '@ngrx/store';
import {ListItemModel} from '../../../models/list-item.model';
import {listApiActions} from '../actions/list-api.actions';
import {listActions} from '../actions/list.actions';

export interface ListState {
  items: Array<ListItemModel>,
  loading: boolean,
  error?: string
}

export const initialListState: ListState = {
  items: [],
  loading: false,
  error: null
};

export const listReducer = createReducer(
  initialListState,

  on(
    listActions.add,
    listActions.remove,
    listActions.removeMarked,
    listActions.update,
    state => {
      return {
        ...state,
        error: null
      };
    }
  ),

  on(listActions.getAll, state => {
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(listApiActions.getAllSuccess, (state, {items}) => {
    return {
      ...state,
      loading: false,
      items: [...items]
    };
  }),

  on(listApiActions.getAllError, (state) => {
    return {
      ...state,
      items: [],
      loading: false,
      error: 'Error getting list (check connection)'
    };
  }),

  on(listApiActions.addError, (state) => {
    return {
      ...state,
      error: 'Error adding a new item'
    };
  }),

  on(listApiActions.updateError, (state) => {
    return {
      ...state,
      error: 'Error updating an item'
    };
  }),

  on(listApiActions.removeError, (state) => {
    return {
      ...state,
      error: 'Error removing an item'
    };
  }),

  on(listApiActions.batchRemoveError, (state) => {
    return {
      ...state,
      error: 'Error removing items'
    };
  }),
);
