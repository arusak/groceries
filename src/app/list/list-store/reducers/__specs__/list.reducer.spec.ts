import {ListItemModel} from '../../../../models/list-item.model';
import {listApiActions} from '../../actions/list-api.actions';
import {listActions} from '../../actions/list.actions';
import {initialListState, listReducer} from '../list.reducer';

describe('List reducer', () => {
  describe('getAll', () => {
    it('should set loading state to true', () => {
      const result = listReducer(initialListState, listActions.getAll());
      expect(result).toEqual({
        ...initialListState,
        error: null,
        loading: true
      });
    });

    it('should load items', () => {
      const result = listReducer(initialListState, listApiActions.getAllSuccess({items: [ListItemModel.createByTitle('Test')]}));
      expect(result.error).toBeNull();
      expect(result.loading).toBe(false);
      expect(result.items.length).toBe(1);
    });

    it('should return error', () => {
      const result = listReducer(initialListState, listApiActions.getAllError());
      expect(result.error).toBeTruthy();
      expect(result.loading).toBe(false);
    });
  });
});
