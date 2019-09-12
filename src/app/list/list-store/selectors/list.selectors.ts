import {createSelector} from '@ngrx/store';
import {ListModuleState} from '../reducers';
import {ListState} from '../reducers/list.reducer';
import {selectListFeatureState} from './feature.selector';

export const selectListState = createSelector(selectListFeatureState, (moduleState: ListModuleState) => moduleState.list);
export const selectListItems = createSelector(selectListState,
  (state: ListState) => state.items.slice(0).sort(
    (i1, i2) => i1.title.localeCompare(i2.title)));
export const selectListError = createSelector(selectListState, (state: ListState) => state.error);
