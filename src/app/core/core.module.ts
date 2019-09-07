import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    }),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ]
})
export class CoreModule {
}
