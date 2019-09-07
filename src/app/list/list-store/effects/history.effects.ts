import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, pluck, startWith, switchMapTo} from 'rxjs/operators';
import {HistoryService} from '../../services/history.service';
import {addError, addSuccess, getAllError, getAllSuccess} from '../actions/history-api.actions';
import {add, getAll} from '../actions/history.actions';

@Injectable()
export class HistoryEffects {
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(getAll),
    startWith(getAll()),
    switchMapTo(
      this.historyService.getAll().pipe(
        map(list => getAllSuccess({items: list})),
        catchError(() => of(getAllError()))
      )
    )
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(add),
    pluck('title'),
    mergeMap(title => this.historyService.add(title).pipe(
      map(items => addSuccess({items})),
      catchError(() => of(addError()))
      )
    )
  ));

  constructor(private actions$: Actions, private historyService: HistoryService) {
  }
}
