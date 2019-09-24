import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AdderComponent} from './components/adder/adder.component';
import {HistoryComponent} from './components/history/history.component';
import {ListToolbarComponent} from './components/list-toolbar/list-toolbar.component';
import {ListViewComponent} from './components/list-view/list-view.component';
import {ListComponent} from './components/list/list.component';
import {ListRoutingModule} from './list-routing.module';
import {ListStoreModule} from './list-store/list-store.module';

@NgModule({
  declarations: [
    ListViewComponent,
    AdderComponent,
    HistoryComponent,
    ListComponent,
    ListToolbarComponent
  ],
  imports: [
    SharedModule,
    ListRoutingModule,
    ListStoreModule,
    FormsModule,
  ]
})
export class ListModule {
}
