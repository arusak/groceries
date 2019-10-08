import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) {
  }

  showError(text: string) {
    this.snackBar.open(text, 'Dismiss', {duration: 10000});
  }
}
