import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.sass']
})
export class ListToolbarComponent {
  @Output() cleanup = new EventEmitter();
}
