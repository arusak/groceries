import {Observable, ReplaySubject, Subject} from 'rxjs';

export class BasePage {
  protected unsubscribe$: Observable<any>;
  private unsubscribeSubj: Subject<any>;

  constructor() {
    this.unsubscribeSubj = new ReplaySubject(1);
    this.unsubscribe$ = this.unsubscribeSubj.asObservable();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubj.next();
    this.unsubscribeSubj.complete();
  }
}
