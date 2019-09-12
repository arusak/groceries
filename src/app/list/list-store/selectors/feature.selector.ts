import {createFeatureSelector} from '@ngrx/store';
import {ListModuleState} from '../reducers';

export const selectListFeatureState = createFeatureSelector<ListModuleState>('list');
