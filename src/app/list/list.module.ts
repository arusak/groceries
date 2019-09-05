import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {SharedModule} from '../shared/shared.module';
import {AdderComponent} from './components/adder/adder.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {ListEffects} from './effects/list.effects';
import {ListRoutingModule} from './list-routing.module';
import {listReducerNg, metaReducers} from './reducers';

@NgModule({
  declarations: [
    ListViewComponent,
    AdderComponent
  ],
  imports: [
    SharedModule,
    ListRoutingModule,
    StoreModule.forFeature('list', listReducerNg, {metaReducers}),
    EffectsModule.forFeature([ListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    }),
    FormsModule
  ]
})
export class ListModule {
}
