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
  on(listApiActions.addSuccess, (state, {item}) => {
    let updatedItems = [...state.items, item];
    return {
      ...state,
      items: updatedItems
    };
  }),
  on(listApiActions.addError, (state) => {
    return {
      ...state,
      error: 'Error adding a new item'
    };
  }),
  on(listApiActions.updateSuccess, (state, {item}) => {
    let updatedItemIndex = state.items.findIndex(cur => cur.id === item.id);
    let updatedItems = [...state.items];
    updatedItems[updatedItemIndex] = item;
    return {
      ...state,
      items: updatedItems
    };
  }),
  on(listApiActions.updateError, (state) => {
    return {
      ...state,
      error: 'Error updating an item'
    };
  }),
  on(listApiActions.removeSuccess, (state, {item}) => {
    let updatedItemIndex = state.items.findIndex(cur => cur.id === item.id);
    let updatedItems = [...state.items].splice(updatedItemIndex, 1);
    return {
      ...state,
      items: updatedItems
    };
  }),
  on(listApiActions.removeError, (state) => {
    return {
      ...state,
      error: 'Error removing an item'
    };
  }),
  on(listApiActions.batchRemoveSuccess, (state, {items}) => {
    return {
      ...state,
      items: [...items]
    };
  }),
  on(listApiActions.batchRemoveError, (state) => {
    return {
      ...state,
      error: 'Error removing items'
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
