import { TestBed } from '@angular/core/testing';

import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  let service: CalculadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculadoraService]
    });
    service = TestBed.inject(CalculadoraService);
  });

  it('Deve somar, corretamente, dois números', () => {
    expect(service).toBeTruthy();
    const result = service.calcular(5,8,'soma');
    expect(result).toBe(13, "O resultado deve ser igual a 13")
  });

  it('Deve subtrair, corretamente, dois números', () => {
    expect(service).toBeTruthy();
    const result = service.calcular(16,3,'subtração');
    expect(result).toBe(13, 'O resultado deve ser igual a 13')
  })

  it("Deve dividir, corretamente, dois números", () => {
    expect(service).toBeTruthy();
    const result = service.calcular(6,2, 'divisão');
    expect(result).toBe(3, "O resultado deve ser igual a 3")
  })

  it("Deve multiplicar, corretamente, dois números", () => {
    expect(service).toBeTruthy();
    const result = service.calcular(2,2, 'multiplicação');
    expect(result).toBe(4, "O resultado deve ser igual a 4")
  })
});
