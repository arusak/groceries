import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, pluck, startWith, switchMapTo} from 'rxjs/operators';
import {ListService} from '../../services/list.service';
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

@Injectable()
export class ListEffects {
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(getAll),
    startWith(getAll()),
    switchMapTo(
      this.listService.getList().pipe(
        map(list => getAllSuccess({items: list})),
        catchError(() => of(getAllError()))
      )
    )
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(add),
    pluck('title'),
    mergeMap(title => this.listService.add(title).pipe(
      map(items => addSuccess({items})),
      catchError(() => of(addError()))
      )
    )
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(update),
    pluck('item'),
    mergeMap(item => this.listService.update(item).pipe(
      map(items => updateSuccess({items})),
      catchError(() => of(updateError()))
      )
    )
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(remove),
    pluck('item'),
    mergeMap(item => this.listService.remove(item).pipe(
      map(items => removeSuccess({items})),
      catchError(() => of(removeError()))
      )
    )
  ));

  constructor(private actions$: Actions, private listService: ListService) {
  }
}
