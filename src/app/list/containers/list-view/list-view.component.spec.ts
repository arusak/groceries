import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {ListItemModel} from '../../../models/list-item.model';
import {ErrorService} from '../../../services/error.service';
import {listActions} from '../../list-store/actions/list.actions';
import {listReducerNg} from '../../list-store/reducers';
import {ListState} from '../../list-store/reducers/list.reducer';
import {AdderComponentStub} from './__stubs__/adder.component.stub';
import {ListToolbarComponentStub} from './__stubs__/list-toolbar.component.stub';
import {ListComponentStub} from './__stubs__/list.component.stub';
import {ListViewComponent} from './list-view.component';

describe('ListViewComponent', () => {
  let store: Store<ListState>;
  let fixture: ComponentFixture<ListViewComponent>;
  let component: ListViewComponent;
  let dispatchSpy: jasmine.Spy<any>;
  let item = ListItemModel.createByTitle('Test');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(listReducerNg)
      ],
      declarations: [ListViewComponent, ListComponentStub, ListToolbarComponentStub, AdderComponentStub],
      providers: [
        {
          provide: ErrorService,
          useValue: {
            showError: jasmine.createSpy()
          }
        }
      ]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch');
  });

  describe('Actions', () => {
    it('should dispatch remove on removeItem', () => {
      let action = listActions.remove({item});
      component.removeItem(item);
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });
    it('should dispatch update on updateItem', () => {
      let action = listActions.update({item});
      component.updateItem(item);
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });
    it('should dispatch removeMarked on cleanup', () => {
      let action = listActions.removeMarked();
      component.cleanup();
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });
  });
});
