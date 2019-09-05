import {Action, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../../environments/environment';
import {listReducer, ListState} from './list.reducer';

export function listReducerNg(state: ListState | undefined, action: Action) {
  return listReducer(state, action);
}

export const metaReducers: MetaReducer<ListState>[] = !environment.production ? [storeFreeze] : [];
