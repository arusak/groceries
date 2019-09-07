import {createAction, props} from '@ngrx/store';

export const getAll = createAction('[History] Get all');
export const add = createAction('[History] Add', props<{ title: string }>());
