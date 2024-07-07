import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ErrorMessageComponent } from "./errormessage.component"
import { By } from "@angular/platform-browser";

describe('ErrorMessageComponent', () => {
    let component: ErrorMessageComponent;
    let fixture: ComponentFixture<ErrorMessageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ErrorMessageComponent], // declaração do componente que será testado
        }).compileComponents(); // compila o componente para que o TestBed possa utilza-lo

        fixture = TestBed.createComponent(ErrorMessageComponent); // cria a instância do componente
        component = fixture.componentInstance; // pega a instância do componente para acessar propriedades e métodos
        fixture.detectChanges(); // dispara a detecção de mudanças para atualizar o estado do componente
    })

    it('create component', () => {
        expect(component).toBeTruthy(); // verifica se o componente foi criado com sucesso
    });

    it('renders default error state', () => {
        const messageContainer = fixture.debugElement.query(
            By.css('[data-testId="message-container"]')
        );

        expect(messageContainer.nativeElement.textContent).toBe(
            'Something went wrong!'
        );
    });

    it('renders custom error message', () => {
        component.message = "Email is already taken!";

        fixture.detectChanges();

        const messageContainer = fixture.debugElement.query(
            By.css('[data-testId="message-container"')
        );

        expect(messageContainer.nativeElement.textContent).toBe(
            'Email is already taken!'
        );
    });
});