import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development'; // Importando a configuração do ambiente
import { Todo } from '../_models/Todo';

describe('TodosService', () => {
  let toDosService: TodosService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl + 'todos'; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [TodosService],
    });
    toDosService = TestBed.inject(TodosService); 
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(toDosService).toBeTruthy();
  });

  it('Deve retornar todos os TODOS', () => {
    const mockTodos: Todo[] = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
    ];

    toDosService.getAll().subscribe((todos) => {
      expect(todos.length).toBe(2); 
      expect(todos).toEqual(mockTodos); 
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockTodos); 
  });

  it('Deve retornar o TODO por Id', () => {
    const mockTodo: Todo = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    const todoId = 1;

    toDosService.getById(todoId).subscribe((todo) => {
      expect(todo).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(`${baseUrl}/${todoId}`);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockTodo);
  });
});
