import {Component, OnInit} from '@angular/core';
import {ListItem} from '../../models/list-item.model';
import {ListService} from '../services/list.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.sass']
})
export class ListViewComponent implements OnInit {

  list: Array<ListItem>;

  constructor(public listService: ListService) {
  }

  ngOnInit() {
    this.listService.getList().subscribe(list => {
      // console.log(list);
      this.list = list;
    });
  }

}
