import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../todo/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;
  todo:Todo;

  constructor(private db: AngularFirestore) {      
  }
  
  ngOnInit() {
    this.todoCollectionRef = this.db.collection<Todo>('todos');
      this.todo$ = this.todoCollectionRef.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Todo;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      });
      this.todo = {description: '', completed: false};      
  }

  addTodo(todoDesc: string) {
    if (todoDesc && todoDesc.trim().length) {
      this.todoCollectionRef.add({ description: todoDesc, completed: false });
      this.todo = {description: '', completed: false};      
    }
  }

  updateTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).update({ completed: !todo.completed });
  }
  
  deleteTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).delete();
  }

}

