import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { phoneNumberValidator } from 'gm-tel-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gm-tel-input-tester';
  telNumberCtrl: FormControl = new FormControl('', [phoneNumberValidator()]);
  telNumber = {};
}
