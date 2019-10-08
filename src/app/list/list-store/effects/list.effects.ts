import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, pluck, startWith, switchMapTo} from 'rxjs/operators';
import {ListService} from '../../services/list.service';
import {listApiActions} from '../actions/list-api.actions';
import {listActions} from '../actions/list.actions';

@Injectable()
export class ListEffects {
  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(listActions.getAll),
    startWith(listActions.getAll()),
    switchMapTo(
      this.listService.getList().pipe(
        map(list => listApiActions.getAllSuccess({items: list})),
        catchError(() => of(listApiActions.getAllError()))
      )
    )
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(listActions.addToList),
    pluck('title'),
    mergeMap(title => this.listService.add(title).pipe(
      map(item => listApiActions.addSuccess({item})),
      catchError(() => of(listApiActions.addError()))
      )
    )
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(listActions.update),
    pluck('item'),
    mergeMap(item => this.listService.update(item).pipe(
      map(item => listApiActions.updateSuccess({item})),
      catchError(() => of(listApiActions.updateError()))
      )
    )
  ));

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(listActions.remove),
    pluck('item'),
    mergeMap(item => this.listService.remove(item).pipe(
      map(item => listApiActions.removeSuccess({item})),
      catchError(() => of(listApiActions.removeError()))
      )
    )
  ));

  removeMarked$ = createEffect(() => this.actions$.pipe(
    ofType(listActions.removeMarked),
    mergeMap(() => this.listService.removeMarked().pipe(
      map(items => listApiActions.batchRemoveSuccess({items})),
      catchError(() => of(listApiActions.batchRemoveError()))
      )
    )
  ));

  constructor(private actions$: Actions, private listService: ListService) {
  }
}
