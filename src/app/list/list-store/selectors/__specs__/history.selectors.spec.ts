import {HistoryItemModel} from '../../../../models/history-item.model';
import {ListItemModel} from '../../../../models/list-item.model';
import {selectAllHistoryItems, selectFilteredHistoryItems, selectHistoryFilter, selectUnusedHistoryItems} from '../history.selectors';

const titles = ['Whiskey', 'Foxtrot', 'Mike', 'Echo', 'Papa', 'Yankee', 'November', 'Juliet', 'Golf', 'Kilo', 'Delta', 'Bravo', 'Romeo', 'India', 'Victor', 'Quebec', 'Uniform', 'Charlie', 'Zulu', 'Alpha', 'Oscar', 'Hotel', 'X-ray', 'Lima', 'Tango', 'Sierra'];

describe('History selectors', () => {
  let items: Array<HistoryItemModel>;
  let sorted: Array<HistoryItemModel>;
  let unused: Array<HistoryItemModel>;

  const addedIndexes = [3, 6, 9];
  let added: Array<ListItemModel>;
  const filter = 'p';

  beforeEach(() => {
    items = titles.map(HistoryItemModel.createByTitle);
    // set count equal to initial index
    items = items.map((item, idx) => HistoryItemModel.update(item, {count: idx}));
    sorted = selectAllHistoryItems.projector({items});
    added = addedIndexes.map(idx => ListItemModel.createByTitle(items[idx].title));
    unused = selectUnusedHistoryItems.projector(sorted, added);
  });

  it('selectHistoryFilter should return current filter', () => {
    expect(selectHistoryFilter.projector({filter})).toBe(filter);
  });

  it('selectAllHistoryItems should return a new array of items sorted by count', () => {
    let result = true;
    for (let i = 0; i < sorted.length - 1; i++) {
      result = result && sorted[i].count >= sorted[i + 1].count;
    }

    expect(result).toBeTruthy();
    expect(sorted.length).toBe(items.length);
    expect(sorted).not.toBe(items);
  });

  it('selectUnusedHistoryItems should return items which were not added', () => {
    // count is equal to initial index
    let expected = sorted.filter(item => !addedIndexes.includes(item.count));
    expect(unused.length).toBe(expected.length);
  });

  it('selectFilteredHistoryItems should return only items which start with filter prefix', () => {
    let filtered = selectFilteredHistoryItems.projector(unused, filter);
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Papa');
  });

  it('selectFilteredHistoryItems should return empty array if there are no items with such prefix', () => {
    let filtered = selectFilteredHistoryItems.projector(unused, 'lobster');
    expect(filtered.length).toBe(0);
  });
});

