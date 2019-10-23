import {HistoryItemModel} from '../../../../models/history-item.model';
import {historyApiActions} from '../../actions/history-api.actions';
import {historyActions} from '../../actions/history.actions';
import {historyReducer, initialHistoryState} from '../history.reducer';

describe('History reducer', () => {
  describe('getAll', () => {
    it('should set loading state to true', () => {
      const result = historyReducer(initialHistoryState, historyActions.getAll());
      expect(result).toEqual({
        ...initialHistoryState,
        error: null,
        loading: true
      });
    });

    it('should load items', () => {
      const result = historyReducer(initialHistoryState, historyApiActions.getAllSuccess({items: [HistoryItemModel.createByTitle('Test')]}));
      expect(result.error).toBeNull();
      expect(result.loading).toBe(false);
      expect(result.items.length).toBe(1);
    });

    it('should return error', () => {
      const result = historyReducer(initialHistoryState, historyApiActions.getAllError());
      expect(result.error).toBeTruthy();
      expect(result.loading).toBe(false);
    });
  });
});
