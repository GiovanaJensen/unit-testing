import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateNewAccessPlaceComponent } from './create-new-access-place.page';
import { InputDefaultComponent } from '../../components/input-default/input-default.component';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreateNewAccessPlaceComponent', () => {
  let component: CreateNewAccessPlaceComponent;
  let fixture: ComponentFixture<CreateNewAccessPlaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        InputDefaultComponent,
        TextareaComponent,
        CreateNewAccessPlaceComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewAccessPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the default values', () => {
    expect(component.codeControl.value).toBe('CD00');
    expect(component.nameControl.value).toBe('');
    expect(component.descriptionControl.value).toBe('');
  })

  it('should verify if the form is valid', () => {
    component.nameControl.setValue('Meu Nome');
    fixture.detectChanges();

    expect(component.createNewAccessPlace.valid).toBeTrue();
  })

  it('should update "description" when onDescription is called', () => {
    component.onDescriptionChange('new description');

    component.onDescriptionChange('new description');
    expect(component.descriptionControl.value).toBe('new description');
  })

  it('should submit the form with the valid data', () => {
    component.codeControl.setValue('CD01');
    component.nameControl.setValue('Meu nome');
    component.descriptionControl.setValue('Descrição 1');

    const consoleSpy = spyOn(console, 'log');
    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('enviado');
    expect(component.createNewAccessPlace.valid).toBeTrue();
  })

  it('should not submit the form with invalid data', () => {
    component.nameControl.setValue('');

    const consoleSpy = spyOn(console, 'log');
    component.onSubmit();

    expect(consoleSpy).not.toHaveBeenCalledWith('enviado');
    expect(component.createNewAccessPlace.valid).toBeFalse();
  })

  it('should call "onCreateAccessPlace" and log valid data', () => {
    component.codeControl.setValue('CD01');
    component.nameControl.setValue('Meu nome');
    component.descriptionControl.setValue('Descrição 1');

    const consoleSpy = spyOn(console, 'log');
    component.onCreateAccessPlace();

    expect(consoleSpy).toHaveBeenCalledWith(true);

  })

});
