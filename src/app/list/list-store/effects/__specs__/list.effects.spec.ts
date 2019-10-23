import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {cold, hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';
import {ListItemModel} from '../../../../models/list-item.model';
import {ListService} from '../../../services/list.service';
import {listApiActions} from '../../actions/list-api.actions';
import {listActions} from '../../actions/list.actions';
import {ListEffects} from '../list.effects';

describe('ListEffects', () => {
  let effects: ListEffects;
  let actions$: Observable<Action>;
  let service: jasmine.SpyObj<ListService>;

  const serviceMock = {
    getAll: jasmine.createSpy(),
    add: jasmine.createSpy(),
    update: jasmine.createSpy(),
    removeMarked: jasmine.createSpy(),
    remove: jasmine.createSpy(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: ListService,
          useValue: serviceMock
        },
        ListEffects,
      ]
    });

    service = TestBed.get(ListService);
    effects = TestBed.get(ListEffects);
  });

  it('getAll$ should return getAllSuccess with items on success', () => {
    const items = [ListItemModel.createByTitle('Item')];
    const response$ = cold('-r|', {r: items});
    service.getAll.and.returnValue(response$);

    const inputAction = listActions.getAll();
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = listApiActions.getAllSuccess({items});
    const expected$ = cold('--o', {o: outcomeAction});
    const actual = effects.getAll$;
    expect(actual).toBeObservable(expected$);
  });

  it('getAll$ should return getAllError on error', () => {
    const response$ = cold('-#|');
    service.getAll.and.returnValue(response$);

    const inputAction = listActions.getAll();
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = listApiActions.getAllError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.getAll$).toBeObservable(expected$);
  });

  it('add$ should return addSuccess with item on success', () => {
    const title = 'Item';
    const item = ListItemModel.createByTitle(title);
    const response$ = cold('-r|', {r: item});
    service.add.and.returnValue(response$);

    const inputAction = listActions.add({title});
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = listApiActions.addSuccess({item});
    const expected$ = cold('--o', {o: outcomeAction});
    expect(effects.add$).toBeObservable(expected$);
  });

  it('add$ should return addError on error', () => {
    const inputAction = listActions.add({title: 'Test'});
    actions$ = hot('-a', {a: inputAction});

    const response$ = cold('-#|');
    service.add.and.returnValue(response$);

    const outcomeAction = listApiActions.addError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.add$).toBeObservable(expected$);
  });

  it('update$ should return updateSuccess with item on success', () => {
    const item = ListItemModel.createByTitle('Item');
    const response$ = cold('-r|', {r: item});
    service.update.and.returnValue(response$);

    const inputAction = listActions.update({item});
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = listApiActions.updateSuccess({item});
    const expected$ = cold('--o', {o: outcomeAction});
    expect(effects.update$).toBeObservable(expected$);
  });

  it('update$ should return updateError on error', () => {
    const item = ListItemModel.createByTitle('Item');
    const inputAction = listActions.update({item});
    actions$ = hot('-a', {a: inputAction});

    const response$ = cold('-#|');
    service.update.and.returnValue(response$);

    const outcomeAction = listApiActions.updateError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.update$).toBeObservable(expected$);
  });

  it('remove$ should return removeSuccess with item on success', () => {
    const item = ListItemModel.createByTitle('Item');
    const response$ = cold('-r|', {r: item});
    service.remove.and.returnValue(response$);

    const inputAction = listActions.remove({item});
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = listApiActions.removeSuccess({item});
    const expected$ = cold('--o', {o: outcomeAction});
    expect(effects.remove$).toBeObservable(expected$);
  });

  it('remove$ should return removeError on error', () => {
    const item = ListItemModel.createByTitle('Item');
    const inputAction = listActions.remove({item});
    actions$ = hot('-a', {a: inputAction});

    const response$ = cold('-#|');
    service.remove.and.returnValue(response$);

    const outcomeAction = listApiActions.removeError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.remove$).toBeObservable(expected$);
  });

  it('removeMarked$ should return batchRemoveSuccess with items on success', () => {
    const items = [ListItemModel.createByTitle('Item')];
    const response$ = cold('-r|', {r: items});
    service.removeMarked.and.returnValue(response$);

    const inputAction = listActions.removeMarked();
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = listApiActions.batchRemoveSuccess({items});
    const expected$ = cold('--o', {o: outcomeAction});
    const actual = effects.removeMarked$;
    expect(actual).toBeObservable(expected$);
  });

  it('removeMarked$ should return batchRemoveError on error', () => {
    const response$ = cold('-#|');
    service.removeMarked.and.returnValue(response$);

    const inputAction = listActions.removeMarked();
    actions$ = hot('-a', {a: inputAction});

    const outcomeAction = listApiActions.batchRemoveError();
    const expected$ = cold('--(o|)', {o: outcomeAction});
    expect(effects.removeMarked$).toBeObservable(expected$);
  });
});
