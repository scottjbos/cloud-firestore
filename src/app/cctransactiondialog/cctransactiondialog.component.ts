import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Transaction } from '../cctransaction/cctransaction.model';
import { CctransactionService } from '../cctransaction/cctransaction.service';
import { TransactionType } from '../cctransaction/cctransaction.transactiontype';

@Component({
  selector: 'app-cctransactiondialog',
  templateUrl: './cctransactiondialog.component.html',
  styleUrls: ['./cctransactiondialog.component.css']
})
export class CctransactionDialogComponent implements OnInit {
  title: string;
  transaction: Transaction;
  transactionTypes: TransactionType[];

  constructor(
    private cctransactionService: CctransactionService,
    public dialogRef: MatDialogRef<CctransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.title = data.title;
      this.transaction = Object.assign({}, data.transaction);

      this.cctransactionService.getTransactionTypes().subscribe(data => {
        this.transactionTypes = data.filter(x => x.active === true);
      });
  }

  ngOnInit() {}
  
  save(trasaction: Transaction) {
    if (this.transaction.id == null) {
      this.cctransactionService.addTransaction(trasaction);
    } else {
      this.cctransactionService.updateTransaction(this.transaction);
    }
    this.dialogRef.close(this.transaction);
  }

  cancel() {
    this.dialogRef.close();
  }
}
