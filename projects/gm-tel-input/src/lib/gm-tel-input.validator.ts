import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as googlePhoneLib from 'google-libphonenumber';

const phoneUtil = googlePhoneLib.PhoneNumberUtil.getInstance();

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value) {
      const telNumberPattern = /^[\+]{0,1}([0-9]+\s)*[0-9]+/g;
      if (!telNumberPattern.test(value)) {
        return { 'invalidFormat': { value: control.value } };
      }

      try {
        const number = phoneUtil.parseAndKeepRawInput(value.replace(' ', ''));
        return phoneUtil.isValidNumber(number) ? null :
          { 'invalidTel': { value: control.value } };
      } catch (e) {
        return { 'invalidTel': { value: control.value } };
      }
    }
    return null;
  };
}
