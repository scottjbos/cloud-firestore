import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Transaction } from './cctransaction.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
@Injectable({ providedIn: 'root' })
export class CctransactionService {
  
  transactionsCollection: AngularFirestoreCollection<Transaction>;
  transactions: Observable<Transaction[]>;
  
  constructor(private db: AngularFirestore) {
    this.transactionsCollection = this.db.collection('transactions')
   }
  
  getTransactions(): Observable<Transaction[]> {
    return this.transactions = this.transactionsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
  
}