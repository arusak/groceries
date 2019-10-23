import {Component, EventEmitter, Input, Output} from '@angular/core';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({selector: 'app-new-item', template: ''})
export class NewItemStubComponent {
  @Input() titleMaxLength: number;
  @Output() onUpdateFilter = new EventEmitter<string>();
  @Output() onAddItem = new EventEmitter<string>();
}
