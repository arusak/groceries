import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {add} from '../../list-store/actions/list.actions';

@Component({
  selector: 'app-adder',
  templateUrl: './adder.component.html',
  styleUrls: ['./adder.component.sass']
})
export class AdderComponent implements OnInit {
  newItem: string;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
  }

  addItem(title: string) {
    this.store.dispatch(add({title}));
  }

  submit() {
    let item = this.newItem.trim();
    if (item) {
      this.addItem(item);
    }
    this.newItem = '';
  }
}
