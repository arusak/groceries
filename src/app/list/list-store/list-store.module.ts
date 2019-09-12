import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {HistoryEffects} from './effects/history.effects';
import {ListEffects} from './effects/list.effects';
import {metaReducers, reducers} from './reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('list', reducers, {metaReducers}),
    EffectsModule.forFeature([ListEffects, HistoryEffects]),
  ]
})
export class ListStoreModule {
}
