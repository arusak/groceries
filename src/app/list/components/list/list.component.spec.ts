import {byText, byTitle, createComponentFactory, Spectator} from '@ngneat/spectator';
import {ListItemModel} from '../../../models/list-item.model';
import {SharedModule} from '../../../shared/shared.module';
import {ListComponent} from './list.component';

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;

  const createComponent = createComponentFactory({
    component: ListComponent,
    imports: [SharedModule]
  });

  it('should say that list is empty', () => {
    initComponent([]);
    expect(spectator.query(byText('Nothing here'))).toBeDefined();
  });

  it('should stop saying that list is empty', () => {
    initComponent(initList(1));
    expect(spectator.query(byText('Nothing here'))).toBeFalsy();
  });

  it('should show all items', () => {
    let list = initList(20);
    initComponent(list);
    expect(spectator.queryAll('.list .item').length).toBe(list.length);
    expect(spectator.queryAll(byText(/Test Item #[0-9]{1,2}/)).length).toBe(list.length);
  });

  describe('marked items', () => {
    let list: Array<ListItemModel>;

    beforeEach(() => {
      list = initList(2);
      list[0] = ListItemModel.update(list[0], {marked: true});
    });

    it('should show marked items', () => {
      initComponent(list);
      expect(spectator.queryAll('.list .item.marked').length).toBe(1);
      expect(spectator.queryAll('.list .item :checked').length).toBe(1);
    });

    it('should call mark() on checkbox click', () => {
      initComponent(list);
      let spy = spyOn(spectator.component, 'mark');
      let checkedBox = spectator.query('.list .item [type=checkbox]:checked');
      let uncheckedBox = spectator.query('.list .item [type=checkbox]:not(:checked)');

      spectator.click(checkedBox);
      spectator.detectChanges();
      expect(spy).toHaveBeenCalledWith(list[0], false);

      spectator.click(uncheckedBox);
      spectator.detectChanges();
      expect(spy).toHaveBeenCalledWith(list[1], true);
    });

    it('should emit updateItem when mark() is called', () => {
      initComponent(list);
      spectator.component.updateItem.subscribe(item => {
        // spreaded to ignore constructor's mismatch
        expect({...item}).toEqual({...list[0], marked: true});
      });
      spectator.component.mark(list[0], true);
    });

    it('should call remove() on remove button click', () => {
      let list = initList(1);
      initComponent(list);
      let spy = spyOn(spectator.component, 'remove');
      let removeButton = spectator.query(byTitle('Remove'));

      spectator.click(removeButton);
      spectator.detectChanges();
      expect(spy).toHaveBeenCalledWith(list[0]);
    });

    it('should emit removeItem when remove() is called', () => {
      initComponent(list);
      spectator.component.removeItem.subscribe(item => {
        expect({...item}).toEqual({...list[0]});
      });
      spectator.component.remove(list[0]);
    });
  });

  function initComponent(list) {
    spectator = createComponent({props: {list}});
    spectator.detectChanges();
  }
});

function initList(size): Array<ListItemModel> {
  return Array(size).fill(0).map((_, i) => ListItemModel.createByTitle('Test Item #' + i));
}
