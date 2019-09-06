export class HistoryItemModel {
  readonly id: string;
  readonly title: string;

  private count: number;

  static createByTitle(title: string) {
    return new HistoryItemModel(title, 1);
  }

  constructor(title: string, count: number, id?: string) {
    this.id = id;
    this.title = title;
    this.count = count;
  }

  increaseCount() {
    this.count++;
  }
}
