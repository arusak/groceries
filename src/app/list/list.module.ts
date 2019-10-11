import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {HistoryComponent} from './components/history/history.component';
import {ListToolbarComponent} from './components/list-toolbar/list-toolbar.component';
import {ListComponent} from './components/list/list.component';
import {AdderComponent} from './containers/adder/adder.component';
import {ListViewComponent} from './containers/list-view/list-view.component';
import {ListRoutingModule} from './list-routing.module';
import {ListStoreModule} from './list-store/list-store.module';
import { NewItemComponent } from './components/new-item/new-item.component';

@NgModule({
  declarations: [
    ListViewComponent,
    AdderComponent,
    HistoryComponent,
    ListComponent,
    ListToolbarComponent,
    NewItemComponent
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
