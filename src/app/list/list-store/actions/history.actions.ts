import {createAction, props} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';

export const historyActions = {
  getAll: createAction('[History] Get all'),
  changeFilter: createAction('[History] Get filtered', props<{ term: string }>()),
  updateItem: createAction('[History] Update', props<{ item: HistoryItemModel }>()),
  add: createAction('[History] Add', props<{ title: string }>()),
};

