import {Action, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../../../environments/environment';
import {historyReducer, HistoryState} from './history.reducer';
import {listReducer, ListState} from './list.reducer';

export interface ListModuleState {
  list: ListState;
  history: HistoryState;
}

export function historyReducerNg(state: HistoryState | undefined, action: Action) {
  return historyReducer(state, action);
}

//
export function listReducerNg(state: ListState | undefined, action: Action) {
  return listReducer(state, action);
}

export const reducers: ActionReducerMap<ListModuleState> = {
  list: listReducerNg,
  history: historyReducerNg,
};

export const metaReducers: MetaReducer<ListModuleState>[] = !environment.production ? [storeFreeze] : [];
