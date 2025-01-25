import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-informative-modal',
  templateUrl: './informative-modal.component.html',
  styleUrls: ['./informative-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class InformativeModalComponent  implements OnInit {
  @Input() modalType: 'default' | 'success' | 'warning' | 'error' | 'informative' = 'default';
  @Input() hasIcon: boolean = false;
  @Input() iconClass: string = '';
  @Input() title: string  = '';
  @Input() hasSubtitle: boolean = false;
  @Input() subtitle: string = '';
  @Input() actionCallback?: () => void;
  @Output() dismissEvent = new EventEmitter<void>();

  isVisible = false;

  constructor() { }

  ngOnInit() {
    this.showModal();
  }

  showModal() {
    this.isVisible = true;
  }

  dismiss() {
    this.isVisible = false;
    this.dismissEvent.emit();
    if (this.actionCallback) {
      this.actionCallback();
    }
  }

}
