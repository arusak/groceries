import {ListItemModel} from '../../models/list-item.model';

export function listItemsSorter(i1: ListItemModel, i2: ListItemModel) {
  let o1 = i1.order || 0;
  let o2 = i2.order || 0;

  return o2 - o1 || i1.title.localeCompare(i2.title);
}
