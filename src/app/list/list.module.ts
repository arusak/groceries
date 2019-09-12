import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AdderComponent} from './components/adder/adder.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {ListRoutingModule} from './list-routing.module';
import {ListStoreModule} from './list-store/list-store.module';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    ListViewComponent,
    AdderComponent,
    HistoryComponent
  ],
  imports: [
    SharedModule,
    ListRoutingModule,
    ListStoreModule,
    FormsModule
  ]
})
export class ListModule {
}
