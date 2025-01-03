import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { provideHttpClient } from '@angular/common/http';

describe('TodosService', () => {
  let toDosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        provideHttpClient()
      ]
    });
    toDosService = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(toDosService).toBeTruthy();
  });

  it('Deve retornar todos os TODOS', () => {
    toDosService.getAll().subscribe(todos => {
      expect(todos).toBeTruthy('Nenhum TODO foi retornado');
      expect(todos.length).toEqual(200, 'A quantidade de Todos não é 200')

      const todo = todos.find(todo => todo.id == 15);
      expect(todo?.title).toEqual("ab voluptatum amet voluptas")
    })
  })

  it('Deve retornar o TODO por Id', async () => {
    const todo = await toDosService.getById(12).toPromise();
    expect(todo).toBeTruthy();
    expect(todo?.id).toEqual(12);
  })
});
