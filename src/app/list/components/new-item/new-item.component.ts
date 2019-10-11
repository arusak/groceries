import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewItemComponent {
  @Input() titleMaxLength: number;
  @Output() onUpdateFilter = new EventEmitter<string>();
  @Output() onAddItem = new EventEmitter<string>();

  input: string;

  resetFilter() {
    this.input = '';
  }

  updateFilter() {
    this.onUpdateFilter.emit(this.input.trim());
  }

  addItem() {
    this.onAddItem.emit(this.normalizeInput(this.input));
  }

  // trim whitespace, capitalize 1st word, trim to max length
  private normalizeInput(input) {
    let normalized = input.trim();
    normalized = normalized.charAt(0).toLocaleUpperCase() + normalized.substr(1);
    normalized = normalized.substr(0, this.titleMaxLength);
    return normalized;
  }
}
