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

  it('should limit input max length', () => {
    component.type = "text";
    component.maxLength = 5;
    component.control = new FormControl('', Validators.required);
    component.control.setValue('');

    const inputEvent = {target: {value: '123456'}};
    component.onInputChange(inputEvent);

    expect(component.control.value).toBe('12345');
  })

  it('should parse numeric input correctly', () => {
    component.type = "number";
    component.control = new FormControl('', Validators.required);
    component.control.setValue('');

    const inputEvent = {target: {value: '123'}}
    component.onInputChange(inputEvent);

    expect(component.control.value).toBe(123)
  })

  it('should set control value to an empty string on invalid numeric input', () => {
    component.type = "number";
    component.control = new FormControl('', Validators.required);
    component.control.setValue('');

    const inputEvent = {target: {value: 'abc'}};
    component.onInputChange(inputEvent);

    expect(component.control.value).toBe('')
  })

  it('should display error message for invalid CPF', () => {
    const control = new FormControl('12345678900', [
      (fc) => (fc.value === '12345678900' ? { invalidCPF: true } : null),
    ]);
    control.markAsTouched();
  
    component.control = control;
    fixture.detectChanges();
  
    expect(control.errors).not.toBeNull();
    expect(control.errors?.['invalidCPF']).toBe(true);
  
    const errorMessage = fixture.nativeElement.querySelector('.error-message p');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.textContent).toContain('precisa ser um CPF válido');
  });

  it('should display error message for invalid CNPJ', () => {
    const control = new FormControl('12345', [
      (fc) => (fc.value === '12345' ? {invalidCNPJ: true}: null)
    ]);
    control.markAsTouched();

    component.control = control;
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message p');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage.textContent).toContain('precisa ser um CNPJ válido');
  });

  it('should not display error message for required input', () => {
    component.isRequired = true;
    component.control = new FormControl('', Validators.required);
    component.control.setValue('123');
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message p');
    expect(errorMessage).toBeNull();
  })

  it('should not display error message for not required input', () => {
    component.isRequired = false;
    component.control = new FormControl('');
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message p');
    expect(errorMessage).toBeNull();
  })
  
});