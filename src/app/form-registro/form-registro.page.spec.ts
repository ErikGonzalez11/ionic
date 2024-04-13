import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRegistroPage } from './form-registro.page';

describe('FormRegistroPage', () => {
  let component: FormRegistroPage;
  let fixture: ComponentFixture<FormRegistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
