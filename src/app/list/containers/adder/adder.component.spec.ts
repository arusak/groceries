import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';
import {Store} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {HistoryState} from '../../list-store/reducers/history.reducer';
import {HistoryStubComponent} from './__stubs__/history-stub.component';
import {NewItemStubComponent} from './__stubs__/new-item-stub.component';
import {AdderComponent} from './adder.component';

describe('AdderComponent', () => {
  let fixture: ComponentFixture<AdderComponent>;
  let component: AdderComponent;
  let store: MockStore<{ list: { history: HistoryState } }>;

  let initialState = {list: {history: {filter: '', items: []}}};

  TestBed.configureTestingModule({
    imports: [MatCardModule,
    ],
    declarations: [AdderComponent, NewItemStubComponent, HistoryStubComponent],
    providers: [provideMockStore({initialState}),]
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdderComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

});


