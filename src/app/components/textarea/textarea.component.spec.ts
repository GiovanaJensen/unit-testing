import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TextareaComponent, ReactiveFormsModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
