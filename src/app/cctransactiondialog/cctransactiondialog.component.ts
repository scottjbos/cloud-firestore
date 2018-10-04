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
  types: TransactionType[] = [
    { value: 'Sale', viewValue: 'Sale' },
    { value: 'Payment', viewValue: 'Payment' }
  ];

  constructor(
    private cctransactionService: CctransactionService,
    public dialogRef: MatDialogRef<CctransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.title = data.title;
      this.transaction = data.transaction;
  }

  ngOnInit() {}
  
  save(trasaction: Transaction) {
    this.cctransactionService.addTransaction(trasaction);
    this.dialogRef.close(this.transaction);
  }

  cancel() {
    this.dialogRef.close();
  }
}
