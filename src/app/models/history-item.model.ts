export class HistoryItemModel {
  static update(item: HistoryItemModel, update: Partial<HistoryItemModel>) {
    return new HistoryItemModel(update.title || item.title, update.count || item.count, update.id || item.id);
  }

  static increaseCount(item) {
    return HistoryItemModel.update(item, {count: item.count + 1});
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
