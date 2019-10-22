import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HistoryItemModel} from '../../../models/history-item.model';
import {SharedModule} from '../../../shared/shared.module';
import {HistoryComponent} from './history.component';

describe('HistoryComponent', () => {
  let fixture: ComponentFixture<HistoryComponent>;
  let component: HistoryComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [HistoryComponent]
    });
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
  });

  it('should be empty whe no input list', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHtml).toBeFalsy();
  });

  it('should show the content of a list', () => {
    component.list = Array(20).fill(0).map((_, i) => HistoryItemModel.createByTitle('Test Item #' + i));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.list .item')).length).toBe(20);
  });

  it('should call choose(item) on item click', async(async () => {
    let spy = spyOn(component, 'choose');
    let itemModel = HistoryItemModel.createByTitle('Test Item');
    component.list = [itemModel];
    fixture.detectChanges();
    let itemDe = fixture.debugElement.query(By.css('.list .item'));
    itemDe.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(itemModel);
  }));

  it('should emit item when called choose()', () => {
    let item: HistoryItemModel = null;
    component.onChoose.subscribe(val => item = val);
    component.choose(HistoryItemModel.createByTitle('Test Item'));
    expect(item.title).toBe('Test Item');
  });
});
