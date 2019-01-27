import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmTelInputComponent } from './gm-tel-input.component';

describe('GmTelInputComponent', () => {
  let component: GmTelInputComponent;
  let fixture: ComponentFixture<GmTelInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmTelInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
