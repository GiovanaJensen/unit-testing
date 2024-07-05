import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ErrorMessageComponent } from "./errormessage.component"

describe('ErrorMessageComponent', () => {
    let component: ErrorMessageComponent;
    let fixture: ComponentFixture<ErrorMessageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ErrorMessageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('create component', () => {
        expect(component).toBeTruthy();
    });
});