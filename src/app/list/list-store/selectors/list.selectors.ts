import {createSelector} from '@ngrx/store';
import {ListModuleState} from '../reducers';
import {ListState} from '../reducers/list.reducer';
import {selectListFeatureState} from './feature.selector';

const selectListState = createSelector(
  selectListFeatureState,
  (moduleState: ListModuleState) => moduleState.list
);

export const selectListItems = createSelector(
  selectListState,
  (state: ListState) => state.items.slice(0).sort(listItemsComparer)
);

export const selectListError = createSelector(
  selectListState,
  (state: ListState) => state.error
);

function listItemsComparer(i1, i2) {
  if (i1.marked && !i2.marked) {
    return 1;
  }

  if (!i1.marked && i2.marked) {
    return -1;
  }

  return i1.title.localeCompare(i2.title);
}
