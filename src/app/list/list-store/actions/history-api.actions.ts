import {createAction, props} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';

export const historyApiActions = {
  getAllSuccess: createAction('[History API] Read success', props<{ items: Array<HistoryItemModel> }>()),
  getAllError: createAction('[History API] Read error'),

  addSuccess: createAction('[History API] Add success', props<{ items: Array<HistoryItemModel> }>()),
  addError: createAction('[History API] Add error'),

  updateSuccess: createAction('[History API] Update success', props<{ item: HistoryItemModel }>()),
  updateError: createAction('[History API] Update error'),
};
