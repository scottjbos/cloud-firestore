import { TestBed } from '@angular/core/testing';

import { Todo.Service.TsService } from './todo.service.';

describe('Todo.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Todo.Service.TsService = TestBed.get(Todo.Service.TsService);
    expect(service).toBeTruthy();
  });
});
