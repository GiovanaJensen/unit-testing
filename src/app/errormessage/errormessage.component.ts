import { Component, Input } from "@angular/core";

@Component({
    selector: "mc-error-message",
    template: "<div data-testId='message-container'>{{message}}</div>", //data-testId é para entender que será utilizado no teste, se usar id ou classe pode ser removido
    standalone: true,
})

export class ErrorMessageComponent {
    @Input() message: string = "Something went wrong!";
}