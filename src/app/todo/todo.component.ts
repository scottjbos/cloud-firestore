import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../todo/todo.model';
import { TodoService } from './todo.service.';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Observable<Todo[]>;
  todo:Todo;
  showSpinner: boolean = true;

  constructor(
    private todoService: TodoService) {      
  }
  
  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.todos.subscribe(() => this.showSpinner = false);
    this.todo = {description: '', completed: false};

  }

  addTodo(todoDesc: string) {
    this.todoService.addTodo(todoDesc);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }
  
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}