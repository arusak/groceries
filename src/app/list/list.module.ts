import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ListRoutingModule} from './list-routing.module';
import {ListViewComponent} from './list-view/list-view.component';


@NgModule({
  declarations: [ListViewComponent],
  imports: [
    SharedModule,
    ListRoutingModule,
  ]
})
export class ListModule {
}
