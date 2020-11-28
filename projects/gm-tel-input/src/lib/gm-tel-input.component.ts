import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { CountryCode } from './modal/country-code.modal';
import { Country } from './modal/country.modal';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import {formatInputAsInternational} from './gm-tel-input.directive';

@Component({
  selector: 'gm-tel-input',
  templateUrl: './gm-tel-input.component.html',
  styleUrls: ['./gm-tel-input.component.scss'],
  providers: [CountryCode]
})
export class GmTelInputComponent implements OnInit {
  @Input() value;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() id: String = 'contactNbr';
  @Input() separateCountry = false;
  @Input() formControlSrc: FormControl;
  _invalidFormatMsg: string;
  _invalidTelMsg: string;

  allCountries: Array<Country> = [];
  selectedCountry: Country = new Country();

  constructor(
    private countryCodeData: CountryCode
  ) {
    
  }

  get f() {
    return this.formControlSrc;
  }

  get invalidFormatMsg(): string {
    return this._invalidFormatMsg;
  }

  get invalidTelMsg(): string {
    return this._invalidTelMsg;
  }

  @Input('invalidFormatMsg')
  set invalidFormatMsg(value: string) {
    this._invalidFormatMsg = value;
  }

  @Input('invalidTelMsg')
  set invalidTelMsg(value: string) {
    this._invalidTelMsg = value;
  }


  ngOnInit() {
    if (!this.value) {
      this.value = {
        countryCode: '',
        mobileNumber: ''
      };
    }
    this.fetchCountryData();
    this.selectedCountry = this.allCountries[0];
    this.onChanges();
    
  }

  private onChanges(): void {
    if (!this.formControlSrc) {
      return;
    }
    this.formControlSrc.valueChanges.subscribe(val =>
      this.updateModalValue(val.trim()));
  }

  private updateModalValue(val: string): void {
    this.value.countryCode = this.getDialCodeOnly().trim();
    this.value.mobileNumber = this.getMobileNumberOnly(val).trim();
    const countryNbr = this.value.countryCode.concat(this.value.mobileNumber);
    this.value.formatted = formatInputAsInternational(this.selectedCountry.iso2, countryNbr); 
    this.valueChange.emit(this.value);
  }

  private updateFormControlValue(val): void {
    this.formControlSrc.setValue(val);
  }

  private setCountryCode(element): void {
    const dialCode = this.getDialCodeOnly();
    let contactNbr = this.formControlSrc.value;
    if (contactNbr.indexOf(dialCode) !== -1) {
      return;
    }

    const tokens: string[] = contactNbr.split(' ') || [];
    if (tokens.length === 2 && tokens[1].length > 0) {
      const val = !this.separateCountry ? dialCode.concat(tokens[1]) : contactNbr; 
      this.updateFormControlValue(val);
      return;
    }

    contactNbr = this.separateCountry ? contactNbr : dialCode;
    element.focus();
    const currentLength = dialCode.length + 1;
    if (element.setSelectionRange) {
      element.setSelectionRange(currentLength, currentLength);
    } else if (element.createTextRange) {
      const range = element.createTextRange();
      range.collapse(true);
      range.moveEnd('character', currentLength);
      range.moveStart('character', currentLength);
      range.select();
    }
    this.updateFormControlValue(contactNbr);
  }

  public onFocus(evt): void {
    this.setCountryCode(evt.currentTarget);
  }

  public onCountrySelect(country: Country, el): void {
    this.selectedCountry = country;      
    this.setCountryCode(el);
  }

  public onInputKeyPress(event): void {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  protected fetchCountryData(): void {
    this.countryCodeData.allCountries.forEach(c => {
      const country = new Country();
      country.name = c[0].toString();
      country.iso2 = c[1].toString();
      country.dialCode = c[2].toString();
      country.priority = +c[3] || 0;
      country.areaCode = +c[4] || null;
      country.flagClass = 'flag-icon-' + country.iso2.toLocaleLowerCase();
      country.placeHolder = this.separateCountry ? 'XXXXXXXXXX' : '+' + c[2].toString().concat(' ').concat('XXXXXXXXXX');
      this.allCountries.push(country);
    });
  }

  private getMobileNumberOnly(value: string): string {
    return value ? value.replace(this.getDialCodeOnly().trim(), '') : '';
  }

  private getDialCodeOnly(): string {
    return this.selectedCountry ? '+' + this.selectedCountry.dialCode + ' ' : '';
  }
}
