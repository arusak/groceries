import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {
  }

  showError(text: string) {
    window.alert(text);
  }
}
