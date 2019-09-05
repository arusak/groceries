import {createReducer, on} from '@ngrx/store';
import {SimpleListItemModel} from '../../models/simple-list-item.model';
import * as ListApiActions from '../actions/list-api.actions';

export interface ListState {
  items: Array<SimpleListItemModel>,
  error?: string
}

export const initialListState: ListState = {
  items: [],
  error: undefined
};

export const listReducer = createReducer(
  initialListState,
  on(ListApiActions.addSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(ListApiActions.addError, (state) => {
    return {
      ...state,
      error: 'Error adding a new item'
    };
  }),
  on(ListApiActions.updateSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(ListApiActions.updateError, (state) => {
    return {
      ...state,
      error: 'Error updating an item'
    };
  }),
  on(ListApiActions.removeSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(ListApiActions.removeError, (state) => {
    return {
      ...state,
      error: 'Error removing an item'
    };
  }),
  on(ListApiActions.getAllSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(ListApiActions.getAllError, (state) => {
    return {
      ...state,
      items: [],
      error: 'Error getting list (check connection)'
    };
  }),
);
