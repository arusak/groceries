import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ListModuleState} from '../reducers';
import {ListState} from '../reducers/list.reducer';

export const selectListModuleState = createFeatureSelector<ListModuleState>('list');

export const selectListState = createSelector(selectListModuleState, (moduleState: ListModuleState) => moduleState.list);
export const selectListItems = createSelector(selectListState, (state: ListState) => state.items);
export const selectListError = createSelector(selectListState, (state: ListState) => state.error);

export const selectHistoryState = createSelector(selectListModuleState, (moduleState: ListModuleState) => moduleState.history);
