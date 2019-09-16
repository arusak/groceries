import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';

const reexported = [
  CommonModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...reexported
  ],
  exports: [
    ...reexported
  ]
})
export class SharedModule {
}
