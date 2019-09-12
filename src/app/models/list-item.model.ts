export class ListItemModel {
  readonly id?: string;
  readonly title: string;
  readonly quantity: number;
  readonly marked: boolean;
  readonly priority: number;
  readonly order: number;

  static createByTitle(title: string) {
    return new ListItemModel({title, quantity: 1, marked: false, order: 0, priority: 0});
  }

  static update(item: ListItemModel, update: Partial<ListItemModel>) {
    return new ListItemModel(Object.assign({}, item, update));
  }

  private constructor(data: { title: string, quantity: number, marked: boolean, priority: number, order: number, id?: string }) {
    this.id = data.id;
    this.title = data.title;
    this.quantity = data.quantity;
    this.marked = data.marked;
    this.priority = data.priority;
    this.order = data.order;
  }
}
