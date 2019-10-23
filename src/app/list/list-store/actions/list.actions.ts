import {createAction, props} from '@ngrx/store';
import {ListItemModel} from '../../../models/list-item.model';

export const listActions = {
  getAll: createAction('[List] Get all'),
  add: createAction('[List] Add', props<{ title: string }>()),
  remove: createAction('[List] Remove', props<{ item: ListItemModel }>()),
  removeMarked: createAction('[List] Remove Marked'),
  update: createAction('[List] Update', props<{ item: ListItemModel }>()),
};
