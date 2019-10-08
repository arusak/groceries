import {MatSnackBar} from '@angular/material/snack-bar';
import {createServiceFactory, SpectatorService, SpyObject} from '@ngneat/spectator';
import {ErrorService} from './error.service';

describe('ErrorService', () => {
  let snackBar: SpyObject<MatSnackBar>;

  let create = createServiceFactory({
    service: ErrorService,
    mocks: [MatSnackBar]
  });

  let spectator: SpectatorService<ErrorService>;

  beforeEach(() => {
    spectator = create();
    snackBar = spectator.get(MatSnackBar);
  });

  it('exists', () => {
    expect(spectator.service).toBeDefined();
  });

  it('can pop open a snackbar notification', () => {
    const errorText = 'Sample error';
    spectator.service.showError(errorText);
    expect(snackBar.open).toHaveBeenCalledWith(errorText, 'Dismiss', {duration: 10000});
  });
});
