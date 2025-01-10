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

});
