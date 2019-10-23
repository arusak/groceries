import {ListItemModel} from '../../../../models/list-item.model';
import {selectListError, selectListItems} from '../list.selectors';

const titles = ['Whiskey', 'Foxtrot', 'Mike', 'Echo', 'Papa', 'Yankee', 'November', 'Juliet', 'Golf', 'Kilo', 'Delta', 'Bravo', 'Romeo', 'India', 'Victor', 'Quebec', 'Uniform', 'Charlie', 'Zulu', 'Alpha', 'Oscar', 'Hotel', 'X-ray', 'Lima', 'Tango', 'Sierra'];

describe('List selectors', () => {
  it('selectListItems should return all items alphabetically sorted', () => {
    let sorted = selectListItems.projector({items: titles.map(ListItemModel.createByTitle)});
    let result = true;
    for (let i = 0; i < sorted.length - 1; i++) {
      result = result && sorted[i].title.charCodeAt(0) < sorted[i + 1].title.charCodeAt(0);
    }
    expect(result).toBeTruthy();
  });

  it('selectListError should give away the error', () => {
    expect(selectListError.projector({error: 'Error'})).toBe('Error');
  });
});

