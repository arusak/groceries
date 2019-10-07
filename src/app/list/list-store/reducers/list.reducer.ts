import {createReducer, on} from '@ngrx/store';
import {ListItemModel} from '../../../models/list-item.model';
import {listApiActions} from '../actions/list-api.actions';

export interface ListState {
  items: Array<ListItemModel>,
  error?: string
}

export const initialListState: ListState = {
  items: [],
  error: undefined
};

export const listReducer = createReducer(
  initialListState,
  on(listApiActions.addSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(listApiActions.addError, (state) => {
    return {
      ...state,
      error: 'Error adding a new item'
    };
  }),
  on(listApiActions.updateSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(listApiActions.updateError, (state) => {
    return {
      ...state,
      error: 'Error updating an item'
    };
  }),
  on(listApiActions.removeSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(listApiActions.removeError, (state) => {
    return {
      ...state,
      error: 'Error removing an item'
    };
  }),
  on(listApiActions.getAllSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(listApiActions.getAllError, (state) => {
    return {
      ...state,
      items: [],
      error: 'Error getting list (check connection)'
    };
  }),
);
