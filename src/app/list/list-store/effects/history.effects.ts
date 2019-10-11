import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, pluck, startWith, switchMapTo} from 'rxjs/operators';
import {HistoryService} from '../../services/history.service';
import {historyApiActions} from '../actions/history-api.actions';
import {historyActions} from '../actions/history.actions';

@Injectable()
export class HistoryEffects {
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(historyActions.getAll),
    startWith(historyActions.getAll()),
    switchMapTo(
      this.historyService.getAll().pipe(
        map(list => historyApiActions.getAllSuccess({items: list})),
        catchError(() => of(historyApiActions.getAllError()))
      )
    )
  ));

  addToHistory$ = createEffect(() => this.actions$.pipe(
    ofType(historyActions.add),
    pluck('title'),
    mergeMap(title => this.historyService.add(title).pipe(
      map(item => historyApiActions.addSuccess({item})),
      catchError(() => of(historyApiActions.addError()))
      )
    )
  ));

  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(historyActions.updateItem),
    mergeMap(({item}) => this.historyService.update(item).pipe(
      map(item => historyApiActions.updateSuccess({item})),
      catchError(() => of(historyApiActions.updateError()))
      )
    )
  ));

  constructor(private actions$: Actions, private historyService: HistoryService) {
  }
}
