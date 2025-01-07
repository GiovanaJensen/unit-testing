import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InputDefaultComponent } from './input-default.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

describe('InputDefaultComponent', () => {
  let component: InputDefaultComponent;
  let fixture: ComponentFixture<InputDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InputDefaultComponent, ReactiveFormsModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(InputDefaultComponent);
    component = fixture.componentInstance;

    component.control = new FormControl(); 

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.type).toBe('text');
    expect(component.minLength).toBe(0);
    expect(component.maxLength).toBe(150);
    expect(component.step).toBe('any');
    expect(component.selectedValue).toBe('');
  });

  it('should mark control as invalid if required and empty', () => {
    component.isRequired = true;
    component.control = new FormControl('', Validators.required);
    component.control.markAsTouched();
    fixture.detectChanges();

    expect(component.control.invalid).toBeTrue();
    expect(component.control.hasError('required')).toBeTrue();
  })

  it('should disable the control when isDisabled is true', () => {
    component.isDisabled = true;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.control.disabled).toBeTrue();
  })
});