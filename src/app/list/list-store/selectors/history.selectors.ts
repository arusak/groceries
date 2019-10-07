import {createSelector} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';
import {ListItemModel} from '../../../models/list-item.model';
import {ListModuleState} from '../reducers';
import {HistoryState} from '../reducers/history.reducer';
import {selectListFeatureState} from './feature.selector';
import {selectListItems} from './list.selectors';

const selectHistoryState = createSelector(
  selectListFeatureState,
  (moduleState: ListModuleState) => moduleState.history
);

export const selectHistoryFilter = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.filter
);

export const selectAllHistoryItems = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.items.slice(0).sort(listItemsComparer)
);

export const selectUnusedHistoryItems = createSelector(
  selectAllHistoryItems,
  selectListItems,
  (history: Array<HistoryItemModel>, list: Array<ListItemModel>) =>
    history.filter(historyItem => filterOutIfInList(historyItem, list))
);

export const selectFilteredHistoryItems = createSelector(
  selectUnusedHistoryItems,
  selectHistoryFilter,
  prepareHistory
);

function prepareHistory(list: Readonly<Array<HistoryItemModel>>, filter: string): Array<HistoryItemModel> {
  return filter ? filterItemsByTitle(list, filter) : selectTopItems(list);
}

function selectTopItems(list: Readonly<Array<HistoryItemModel>>): Array<HistoryItemModel> {
  return list.slice(0, 10);
}

function filterItemsByTitle(list: Readonly<Array<HistoryItemModel>>, filter: string): Array<HistoryItemModel> {
  return list.filter(item => item.title.toLowerCase().startsWith(filter.toLowerCase()));
}

function filterOutIfInList(historyItem, list) {
  return !list.map(listItem => listItem.title).includes(historyItem.title);
}

function listItemsComparer(i1, i2) {
  return i2.count - i1.count || i1.title.localeCompare(i2.title);
}
