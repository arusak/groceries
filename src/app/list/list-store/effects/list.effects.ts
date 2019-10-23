import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, mergeMap, pluck, startWith, switchMap} from 'rxjs/operators';
import {ListService} from '../../services/list.service';
import {listApiActions} from '../actions/list-api.actions';
import {listActions} from '../actions/list.actions';

@Injectable()
export class ListEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(listActions.getAll),
    startWith(listActions.getAll()),
    switchMap(() => this.listService.getAll()),
    map(list => listApiActions.getAllSuccess({items: list})),
    catchError(() => of(listApiActions.getAllError()))
  );

  @Effect()
  add$ = this.actions$.pipe(
    ofType(listActions.add),
    pluck('title'),
    mergeMap(title => this.listService.add(title)),
    map(item => listApiActions.addSuccess({item})),
    catchError(() => of(listApiActions.addError()))
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType(listActions.update),
    pluck('item'),
    exhaustMap(item => this.listService.update(item)),
    map(item => listApiActions.updateSuccess({item})),
    catchError(() => of(listApiActions.updateError()))
  );

  @Effect()
  remove$ = this.actions$.pipe(
    ofType(listActions.remove),
    pluck('item'),
    exhaustMap(item => this.listService.remove(item)),
    map(item => listApiActions.removeSuccess({item})),
    catchError(() => of(listApiActions.removeError()))
  );

  @Effect()
  removeMarked$ = this.actions$.pipe(
    ofType(listActions.removeMarked),
    switchMap(() => this.listService.removeMarked()),
    map(items => listApiActions.batchRemoveSuccess({items})),
    catchError(() => of(listApiActions.batchRemoveError()))
  );

  constructor(private actions$: Actions, private listService: ListService) {
  }
}
