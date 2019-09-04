import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, pluck, startWith, switchMapTo} from 'rxjs/operators';
import {
  addError,
  addSuccess,
  getAllError,
  getAllSuccess,
  removeError,
  removeSuccess,
  updateError,
  updateSuccess
} from '../actions/list-api.actions';
import {add, getAll, remove, update} from '../actions/list.actions';
import {ListService} from '../services/list.service';

@Injectable()
export class ListEffects {
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(getAll),
    startWith(getAll()),
    switchMapTo(
      this.listService.getSimpleList().pipe(
        map(list => getAllSuccess({items: list})),
        catchError(() => of(getAllError()))
      )
    )
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(add),
    pluck('title'),
    mergeMap(title => this.listService.addSimple(title).pipe(
      map(items => addSuccess({items})),
      catchError(() => of(addError()))
      )
    )
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(update),
    pluck('item'),
    mergeMap(item => this.listService.updateSimple(item).pipe(
      map(items => updateSuccess({items})),
      catchError(() => of(updateError()))
      )
    )
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(remove),
    pluck('item'),
    mergeMap(item => this.listService.removeSimple(item).pipe(
      map(items => removeSuccess({items})),
      catchError(() => of(removeError()))
      )
    )
  ));

  constructor(private actions$: Actions, private listService: ListService) {
  }
}
