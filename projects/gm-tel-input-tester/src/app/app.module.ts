import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GmTelInputModule } from 'gm-tel-input';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GmTelInputModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
