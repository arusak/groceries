import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ListEffects} from './effects/list.effects';
import {metaReducers, reducers} from './reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('list', reducers, {metaReducers}),
    EffectsModule.forFeature([ListEffects]),
  ]
})
export class ListStoreModule {
}
