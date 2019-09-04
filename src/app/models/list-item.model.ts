import {ProductModel} from './product.model';

export class ListItemModel {
  id: string;
  product: ProductModel;
  done: boolean;
  priority: number;
  quantity: number;

  constructor(data: any) {
    this.id = data.id;
    //this.product =
    this.done = data.done;
    this.priority = data.priority;
    this.quantity = data.quantity;
  }
}
