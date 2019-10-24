import {Component, EventEmitter, Output} from '@angular/core';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-list-toolbar',
  template: ''
})
export class ListToolbarComponentStub {
  @Output() cleanup = new EventEmitter<any>();
}
