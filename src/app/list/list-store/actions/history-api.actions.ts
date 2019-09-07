import {createAction, props} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';

export const getAllSuccess = createAction('[History API] Read success', props<{ items: Array<HistoryItemModel> }>());
export const getAllError = createAction('[History API] Read error');

export const addSuccess = createAction('[History API] Add success', props<{ items: Array<HistoryItemModel> }>());
export const addError = createAction('[History API] Add error');
