import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';
import {ListModuleState} from '../reducers';
import {HistoryState} from '../reducers/history.reducer';
import {ListState} from '../reducers/list.reducer';

export const selectListModuleState = createFeatureSelector<ListModuleState>('list');

export const selectListState = createSelector(selectListModuleState, (moduleState: ListModuleState) => moduleState.list);
export const selectListItems = createSelector(selectListState, (state: ListState) => state.items);
export const selectListError = createSelector(selectListState, (state: ListState) => state.error);

export const selectHistoryState = createSelector(selectListModuleState, (moduleState: ListModuleState) => moduleState.history);
export const selectAllHistoryItems = createSelector(selectHistoryState, (state: HistoryState) => state.items);
export const selectHistoryFilter = createSelector(selectHistoryState, (state: HistoryState) => state.filter);
export const selectFilteredHistoryItems = createSelector(
  selectAllHistoryItems,
  selectHistoryFilter,
  (items: HistoryItemModel[], filter: string) => {
    if (!filter) {
      return items.slice(0, 10);
    } else {
      return items.filter(item => item.title.includes(filter));
    }
  });
