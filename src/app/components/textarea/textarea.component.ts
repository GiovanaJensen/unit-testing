import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() rows: number = 4;
  @Input() cols: number = 20;
  @Input() maxLength: number = 1500;
  @Input() isDisabled: boolean = false; 
  @Input() isRequired: boolean = false;
  @Input() width: string = '100%';
  @Output() textChanged = new EventEmitter<string>();

  textValue: string = '';

  onInputChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.textValue = target.value;
    this.textChanged.emit(this.textValue);
    this.onChange(this.textValue);
  }

  writeValue(value: string): void {
    if (value !== undefined) {
      this.textValue = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onTouched: () => void = () => {};

  onChange: (value: string) => void = () => {};

  constructor() { }
}