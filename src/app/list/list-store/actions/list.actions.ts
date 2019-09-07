import {createAction, props} from '@ngrx/store';
import {ListItemModel} from '../../../models/list-item.model';

export const getAll = createAction('[List] Get all');
export const add = createAction('[List] Add', props<{ title: string }>());
export const remove = createAction('[List] Remove', props<{ item: ListItemModel }>());
export const update = createAction('[List] Update', props<{ item: ListItemModel }>());
