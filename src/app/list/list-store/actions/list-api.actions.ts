import {createAction, props} from '@ngrx/store';
import {ListItemModel} from '../../../models/list-item.model';

export const listApiActions = {
  getAllSuccess: createAction('[List API] Read success', props<{ items: Array<ListItemModel> }>()),
  getAllError: createAction('[List API] Read error'),

  addSuccess: createAction('[List API] Add success', props<{ item: ListItemModel }>()),
  addError: createAction('[List API] Add error'),

  removeSuccess: createAction('[List API] Remove success', props<{ item: ListItemModel }>()),
  removeError: createAction('[List API] Remove error'),

  batchRemoveSuccess: createAction('[List API] Batch remove success', props<{ items: Array<ListItemModel> }>()),
  batchRemoveError: createAction('[List API] Batch remove error'),

  updateSuccess: createAction('[List API] Update success', props<{ item: ListItemModel }>()),
  updateError: createAction('[List API] Update error'),
};
