export class HistoryItemModel {
  static increaseCount(item) {
    return new HistoryItemModel(item.title, item.count + 1, item.id);
  }

  static createByTitle(title: string) {
    return new HistoryItemModel(title, 1);
  }

  readonly id: string;
  readonly title: string;
  readonly count: number;

  constructor(title: string, count: number, id?: string) {
    this.id = id;
    this.title = title;
    this.count = count;
  }
}
