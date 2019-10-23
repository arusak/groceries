import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';
import {HistoryItemModel} from '../../../../models/history-item.model';
import {HistoryService} from '../../../services/history.service';
import {historyApiActions} from '../../actions/history-api.actions';
import {historyActions} from '../../actions/history.actions';
import {HistoryEffects} from '../history.effects';

describe('HistoryEffects', () => {
  let effects: HistoryEffects;
  let actions$: Observable<Action>;
  let service: jasmine.SpyObj<HistoryService>;

  const serviceMock = {
    getAll: jasmine.createSpy(),
    add: jasmine.createSpy(),
    update: jasmine.createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: HistoryService,
          useValue: serviceMock
        },
        HistoryEffects,
      ]
    });

    service = TestBed.get(HistoryService);
    effects = TestBed.get(HistoryEffects);
  });

  it('getAll$ should return getAllSuccess with items on success', () => {
    const items = [HistoryItemModel.createByTitle('Item')];
    const response$ = cold('-r|', {r: items});
    service.getAll.and.returnValue(response$);

    const inputAction = historyActions.getAll();
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = historyApiActions.getAllSuccess({items});
    const expected$ = cold('--o', {o: outcomeAction});
    expect(effects.getAll$).toBeObservable(expected$);
  });

  it('getAll$ should return getAllError on error', () => {
    const response$ = cold('-#|');
    service.getAll.and.returnValue(response$);

    const inputAction = historyActions.getAll();
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = historyApiActions.getAllError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.getAll$).toBeObservable(expected$);
  });

  it('add$ should return addSuccess with item on success', () => {
    const title = 'Item';
    const item = HistoryItemModel.createByTitle(title);
    const response$ = cold('-r|', {r: item});
    service.add.and.returnValue(response$);

    const inputAction = historyActions.add({title});
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = historyApiActions.addSuccess({item});
    const expected$ = cold('--o', {o: outcomeAction});
    expect(effects.add$).toBeObservable(expected$);
  });

  it('add$ should return addError on error', () => {
    const inputAction = historyActions.add({title: 'Test'});
    actions$ = hot('-a', {a: inputAction});

    const response$ = cold('-#|');
    service.add.and.returnValue(response$);

    const outcomeAction = historyApiActions.addError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.add$).toBeObservable(expected$);
  });

  it('update$ should return updateSuccess with item on success', () => {
    const item = HistoryItemModel.createByTitle('Item');
    const response$ = cold('-r|', {r: item});
    service.update.and.returnValue(response$);

    const inputAction = historyActions.update({item});
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = historyApiActions.updateSuccess({item});
    const expected$ = cold('--o', {o: outcomeAction});
    expect(effects.update$).toBeObservable(expected$);
  });

  it('update$ should return updateError on error', () => {
    const item = HistoryItemModel.createByTitle('Item');
    const inputAction = historyActions.update({item});
    actions$ = hot('-a', {a: inputAction});

    const response$ = cold('-#|');
    service.update.and.returnValue(response$);

    const outcomeAction = historyApiActions.updateError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.update$).toBeObservable(expected$);
  });
});
