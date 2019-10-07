import {createAction, props} from '@ngrx/store';
import {ListItemModel} from '../../../models/list-item.model';

export const listApiActions = {
  getAllSuccess: createAction('[List API] Read success', props<{ items: Array<ListItemModel> }>()),
  getAllError: createAction('[List API] Read error'),

  addSuccess: createAction('[List API] Add success', props<{ items: Array<ListItemModel> }>()),
  addError: createAction('[List API] Add error'),

  removeSuccess: createAction('[List API] Remove success', props<{ items: Array<ListItemModel> }>()),
  removeError: createAction('[List API] Remove error'),

  updateSuccess: createAction('[List API] Update success', props<{ items: Array<ListItemModel> }>()),
  updateError: createAction('[List API] Update error'),
};
