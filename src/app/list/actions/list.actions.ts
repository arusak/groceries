import {createAction, props} from '@ngrx/store';
import {SimpleListItemModel} from '../../models/simple-list-item.model';

export const getAll = createAction('[List] Get all');
export const add = createAction('[List] Add', props<{ title: string }>());
export const remove = createAction('[List] Remove', props<{ item: SimpleListItemModel }>());
export const update = createAction('[List] Update', props<{ item: SimpleListItemModel }>());
