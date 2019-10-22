import {byTitle, createHostFactory, SpectatorHost} from '@ngneat/spectator';
import {SharedModule} from '../../../shared/shared.module';
import {ListToolbarComponent} from './list-toolbar.component';

describe('ListToolbarComponent', () => {
  let spectator: SpectatorHost<ListToolbarComponent>;

  const createHost = createHostFactory({
    component: ListToolbarComponent,
    imports: [
      SharedModule
    ]
  });

  beforeEach(() => {
    spectator = createHost('<app-list-toolbar></app-list-toolbar>');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should fire events on button click', () => {
    let emitted = false;
    spectator.output('cleanup').subscribe(() => {
      emitted = true;
    });
    let button = spectator.query(byTitle('Cleanup'));
    spectator.click(button);
    expect(emitted).toBeTruthy();
  });
});
