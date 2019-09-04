import {createAction, props} from '@ngrx/store';
import {SimpleListItemModel} from '../../models/simple-list-item.model';

export const getAllSuccess = createAction('[List API] Read success', props<{ items: Array<SimpleListItemModel> }>());
export const getAllError = createAction('[List API] Read error');

export const addSuccess = createAction('[List API] Add success', props<{ items: Array<SimpleListItemModel> }>());
export const addError = createAction('[List API] Add error');

export const removeSuccess = createAction('[List API] Remove success', props<{ items: Array<SimpleListItemModel> }>());
export const removeError = createAction('[List API] Remove error');

export const updateSuccess = createAction('[List API] Update success', props<{ items: Array<SimpleListItemModel> }>());
export const updateError = createAction('[List API] Update error');
