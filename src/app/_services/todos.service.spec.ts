import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment.development';
import { TODO_STRING, TODOS_STRING } from '../server/db-data';

describe('TodosService', () => {
  let toDosService: TodosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    toDosService = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(toDosService).toBeTruthy();
  });

  it('Deve retornar todos os TODOS', () => {
    const req = httpTestingController.expectOne(environment.apiUrl + "todos");
    expect(req.request.method).toEqual('GET');
    req.flush(JSON.parse(TODOS_STRING))
  })

  it('Deve retornar o TODO por Id', async () => {
    const req = httpTestingController.expectOne(environment.apiUrl + "todos/12");
    expect(req.request.method).toEqual('GET');
    req.flush(JSON.parse(TODO_STRING))
  })
});
