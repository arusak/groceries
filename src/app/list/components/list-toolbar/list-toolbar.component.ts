import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListToolbarComponent {
  @Output() cleanup = new EventEmitter();
}
