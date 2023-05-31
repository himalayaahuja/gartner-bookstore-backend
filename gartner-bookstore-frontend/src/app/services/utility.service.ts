import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  /**
   * @description : logs a message to console if app is in debug mode
   * @param message : message to be logged
   */
  log(message: any): void {
    if (!environment.production) {
      console.log(message);
    }
  }

  logError(error: any): void {
    if (!environment.production) {
      console.error(error);
    }
  }

  /**
   * @description validates the control value
   * if it's a valid string i.e not just spaces
   * @returns validator function
   */
  nonEmptyStringValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value || typeof value === 'number') {
        return null;
      }
      return !value.trim() ? { patternInvalid: {} } : null;
    };
  }

  /**
   * @description validates the given pattern
   * @param regexp RegExp to be validated against
   * @returns validator function
   */
  patternValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return !regexp.test(value) ? { patternInvalid: { regexp } } : null;
    };
  }
}
