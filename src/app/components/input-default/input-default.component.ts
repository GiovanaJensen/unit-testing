import { CommonModule } from '@angular/common';
import { Component, ElementRef, forwardRef, input, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-default',
  templateUrl: './input-default.component.html',
  styleUrls: ['./input-default.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputDefaultComponent),
    multi: true
  }]
})
export class InputDefaultComponent  implements OnInit {
  @Input() type: string = "text";
  @Input() label: string = "";
  @Input() control!: FormControl;
  @Input() isDisabled: boolean = false;
  @Input() width: string = '250px';
  @Input() isRequired: boolean = false;
  @Input() mask: string | null = null;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 150;
  @Input() step: string = "any";
  selectedValue: string = '';


  constructor() { }

  private setControlState() {
    this.isDisabled ? this.control.disable() : this.control.enable();
  }

  OnChanges(changes: SimpleChanges) {
    if (changes['isDisabled']) {
      this.setControlState();
    }
  }

  ngOnInit() {
    this.setControlState();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  select(value: string) {
    this.selectedValue = value;
    this.onChange(value);
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    
    if (this.type === 'number') {
      const parsedValue = inputValue ? parseInt(inputValue, 10) : null;

      if (parsedValue !== null && !isNaN(parsedValue)) {
        this.control.setValue(parsedValue, { emitEvent: false });
      } else {
        this.control.setValue('', { emitEvent: false }); 
      }
    } else if (this.type === 'text') {
      if (inputValue.length > this.maxLength) {
        this.control.setValue(inputValue.slice(0, this.maxLength), { emitEvent: false });
      }
    }
  }


}
