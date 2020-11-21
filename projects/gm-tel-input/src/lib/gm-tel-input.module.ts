import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GmTelInputComponent } from './gm-tel-input.component';

@NgModule({
  declarations: [
    GmTelInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    GmTelInputComponent
  ],
  providers: [],
})
export class GmTelInputModule {
  static forRoot(): ModuleWithProviders<GmTelInputModule> {
    return {
      ngModule: GmTelInputModule,
      providers: []
    }
  }
}
