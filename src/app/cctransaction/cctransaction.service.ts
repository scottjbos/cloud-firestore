import { Injectable }   from '@angular/core';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Transaction } from './cctransaction.model';
import { TransactionType } from './cctransaction.transactiontype';

@Injectable({ providedIn: 'root' })
export class CctransactionService {
  
  transactionsCollection: AngularFirestoreCollection<Transaction>;
  transactionTypesCollection: AngularFirestoreCollection<TransactionType>;
  transactions: Observable<Transaction[]>;  
  
  constructor(
    private db: AngularFirestore) {
    this.transactionsCollection = this.db.collection('transaction')
    this.transactionTypesCollection = this.db.collection('transactiontype')
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

  getTransactionTypes(): Observable<TransactionType[]> {
    return this.transactionTypesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as TransactionType;
        data.value = a.payload.doc.id;
        data.key = a.payload.doc.id;
        return data;
      });
    });
  }

  addTransaction(transaction: Transaction) {
    this.transactionsCollection.add(transaction);    
  }

  updateTransaction(transaction: Transaction) {
    this.transactionsCollection.doc(transaction.id).update(transaction);
  }  
}