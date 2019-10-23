import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, pluck, startWith, switchMap} from 'rxjs/operators';
import {HistoryService} from '../../services/history.service';
import {historyApiActions} from '../actions/history-api.actions';
import {historyActions} from '../actions/history.actions';

@Injectable()
export class HistoryEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(historyActions.getAll),
    startWith(historyActions.getAll()),
    switchMap(() => this.historyService.getAll()),
    map(list => historyApiActions.getAllSuccess({items: list})),
    catchError(() => of(historyApiActions.getAllError()))
  );

  @Effect()
  add$ = this.actions$.pipe(
    ofType(historyActions.add),
    pluck('title'),
    exhaustMap(title => this.historyService.add(title)),
    map(item => historyApiActions.addSuccess({item})),
    catchError(() => of(historyApiActions.addError()))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType(historyActions.update),
    switchMap(({item}) => this.historyService.update(item)),
    map(item => historyApiActions.updateSuccess({item})),
    catchError(() => of(historyApiActions.updateError()))
  );

  constructor(private actions$: Actions, private historyService: HistoryService) {
  }
}
