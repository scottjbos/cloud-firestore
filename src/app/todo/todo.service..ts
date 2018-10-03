import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  
  constructor(private db: AngularFirestore) {
    this.todoCollectionRef = this.db.collection<Todo>('todos');
   }

  getTodos() {
    return this.todoCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Todo;
        const id = action.payload.doc.id;        
        return { id, ...data };
      });
    });    
  } 

  addTodo(todoDesc: string) {
    if (todoDesc && todoDesc.trim().length) {
      this.todoCollectionRef.add({ description: todoDesc, completed: false });
    }
  }

  updateTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).update({ completed: !todo.completed });
  }
  
  deleteTodo(todo: Todo) {
    this.todoCollectionRef.doc(todo.id).delete();
  }
}
