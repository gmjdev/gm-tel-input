import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from "@angular/forms";
import * as googlePhoneLib from 'google-libphonenumber';

const phoneUtil = googlePhoneLib.PhoneNumberUtil.getInstance();


/** A hero's name can't match the given regular expression */
export function phoneNumberValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value) {
      const telNumberPattern = /^\+([0-9]+\s)*[0-9]+$/;
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

// @Directive({
//   selector: '[appForbiddenName]',
//   providers: [{ provide: NG_VALIDATORS, useExisting: GmTelInputValidator, multi: true }]
// })
// export class GmTelInputValidator implements Validator {

//   validate(control: AbstractControl): { [key: string]: any } | null {
//     if (this.validTelNumber) {
//       return phoneNumberValidatorFn()(control);
//     }
//     return null;
//   }
// }