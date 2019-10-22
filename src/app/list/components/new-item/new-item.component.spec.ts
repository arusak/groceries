import {FormsModule} from '@angular/forms';
import {byPlaceholder, createHostFactory, SpectatorHost} from '@ngneat/spectator';
import {SharedModule} from '../../../shared/shared.module';

import {NewItemComponent} from './new-item.component';

describe('NewItemComponent', () => {
  let spectator: SpectatorHost<NewItemComponent>;
  const testString = 'test';

  const createHost = createHostFactory({
    component: NewItemComponent,
    imports: [
      SharedModule,
      FormsModule
    ]
  });

  const prepareNewItem = async () => {
    spectator.component.input = testString;
    spectator.detectChanges();
    await spectator.fixture.whenStable();
    spectator.detectChanges();
    return spectator.query('.new-item');
  };

  beforeEach(() => {
    spectator = createHost('<app-new-item [titleMaxLength]="titleMaxLength"></app-new-item>', {
      hostProps: {titleMaxLength: 40}
    });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('.input', () => {
    let input: HTMLInputElement;

    beforeEach(() => {
      input = spectator.query('.filter .input');
    });

    it('should initially be empty', () => {
      expect(input).toHaveValue('');
    });

    it('should have maximum length', () => {
      expect(input).toHaveAttribute('maxlength', '40');
    });

    it('should set input on typing', async () => {
      await spectator.hostFixture.whenStable();
      spectator.typeInElement(testString, input);
      spectator.detectChanges();
      expect(spectator.component.input).toBe(testString);
    });

    it('should reset input on reset()', () => {
      spectator.component.input = 'non-empty';
      spectator.component.resetFilter();
      expect(input.value).toBe('');
    });
  });

  describe('addItem', () => {
    it('should not be created initially', () => {
      let newItemElement = spectator.query('.new-item');
      expect(newItemElement).toBeFalsy();
    });

    it('should be created when input is not empty', async () => {
      let newItemElement = await prepareNewItem();
      expect(newItemElement).toBeTruthy();
    });

    it('should call addItem() on click', async () => {
      let newItemElement = await prepareNewItem();
      let spy = spyOn(spectator.component, 'addItem');
      spectator.click(newItemElement);
      expect(spy).toHaveBeenCalled();
    });

    it('should emit trimmed input with first word capitalized on addItem', () => {
      let output = '';
      spectator.output<string>('onAddItem').subscribe(title => {
        output = title;
      });
      spectator.component.input = '  test  ';
      spectator.component.addItem();
      expect(output).toBe('Test');
    });
  });

  describe('updateFilter', () => {
    it('should call updateFilter on typing', () => {
      let spy = spyOn(spectator.component, 'updateFilter');
      let input = spectator.query(byPlaceholder(/Add item/));
      spectator.typeInElement(testString, input);
      spectator.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit onUpdateFilter with trimmed value when updateFilter is called', () => {
      let output = '';
      spectator.output<string>('onUpdateFilter').subscribe(title => {
        output = title;
      });
      spectator.component.input = '  test  ';
      spectator.component.updateFilter();
      expect(output).toBe('test');
    });
  });

});
