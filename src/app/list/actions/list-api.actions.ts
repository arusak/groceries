import {createAction, props} from '@ngrx/store';
import {ListItemModel} from '../../models/list-item.model';

export const getAllSuccess = createAction('[List API] Read success', props<{ items: Array<ListItemModel> }>());
export const getAllError = createAction('[List API] Read error');

export const addSuccess = createAction('[List API] Add success', props<{ items: Array<ListItemModel> }>());
export const addError = createAction('[List API] Add error');

export const removeSuccess = createAction('[List API] Remove success', props<{ items: Array<ListItemModel> }>());
export const removeError = createAction('[List API] Remove error');

export const updateSuccess = createAction('[List API] Update success', props<{ items: Array<ListItemModel> }>());
export const updateError = createAction('[List API] Update error');
