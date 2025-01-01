import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  constructor() { }

  calcular(num1: number, num2: number, operacao: string) {
    switch (operacao) {
      case 'soma':
        return num1 + num2;
      case 'subtração':
        return num1 - num2;
      case 'divisão':
        return num1 / num2;
      case 'multiplicação':
        return num1 * num2;
      default:
        return null;
    }
  }
}
