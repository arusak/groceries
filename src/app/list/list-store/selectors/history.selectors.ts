import {createSelector} from '@ngrx/store';
import {HistoryItemModel} from '../../../models/history-item.model';
import {ListItemModel} from '../../../models/list-item.model';
import {ListModuleState} from '../reducers';
import {HistoryState} from '../reducers/history.reducer';
import {selectListFeatureState} from './feature.selector';
import {selectListItems} from './list.selectors';

export const selectHistoryState = createSelector(selectListFeatureState, (moduleState: ListModuleState) => moduleState.history);
export const selectHistoryFilter = createSelector(selectHistoryState, (state: HistoryState) => state.filter);

export const selectAllHistoryItems = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.items.slice(0).sort(
    (i1, i2) => i2.count - i1.count || i1.title.localeCompare(i2.title))
);

export const selectUnusedHistoryItems = createSelector(
  selectAllHistoryItems,
  selectListItems,
  (history: Array<HistoryItemModel>, list: Array<ListItemModel>) =>
    history.filter(historyItem => !list.map(listItem => listItem.title).includes(historyItem.title))
);

export const selectFilteredHistoryItems = createSelector(
  selectUnusedHistoryItems,
  selectHistoryFilter,
  (items: HistoryItemModel[], filter: string) => {
    if (!filter) {
      return items.slice(0, 10);
    } else {
      return items.filter(item => item.title.includes(filter));
    }
  });
