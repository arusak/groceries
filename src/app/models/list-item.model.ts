export class ListItem {
  id: string;
  recordId: string;
  done: boolean;
  priority: number;
  quantity: number;

  constructor(data: any) {
    this.id = data.id;
    this.recordId = data.itemId.id;
    this.done = data.done;
    this.priority = data.priority;
    this.quantity = data.quantity;
  }
}
