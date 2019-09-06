export class ListItemModel {
  id?: string;
  title: string;
  quantity: number;
  marked: boolean;
  priority: number;
  order: number;

  static createByTitle(title: string) {
    return new ListItemModel(title, 1, false, 0, 0);
  }

  private constructor(title: string, quantity: number, marked: boolean, priority: number, order: number, id?: string) {
    this.id = id;
    this.title = title;
    this.quantity = quantity;
    this.marked = marked;
    this.priority = priority;
    this.order = order;
  }
}
