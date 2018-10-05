import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';

import { Transaction } from './cctransaction.model';
import { CctransactionService } from './cctransaction.service';
import { CctransactionDialogComponent } from '../cctransactiondialog/cctransactiondialog.component';

@Component({
  selector: 'app-cctransaction',
  templateUrl: './cctransaction.component.html',
  styleUrls: ['./cctransaction.component.css']
})
export class CctransactionComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'type', 'amount', 'description', 'postDate', 'transDate'];
  dataSource = new MatTableDataSource<Transaction>();
  filterValue = "";
  selection = new SelectionModel<Transaction>(true, []);

  showSpinner: boolean = true;

  modalTitle: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cctransactionService: CctransactionService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.cctransactionService.getTransactions().subscribe(data => {
      this.dataSource.data = data;
      setTimeout(() => this.showSpinner = false, 200)
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = "";
    this.applyFilter(this.filterValue);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  openTransactionDialog(transaction: Transaction): void {
    this.modalTitle = (transaction == null ? "Add" : "Edit") + " Transaction"
    if (transaction == null) {
      transaction = {
        id: null,
        amount: 0,
        description: "",
        postDate: new Date(),
        transDate: new Date(),
        type: "Sale"
      };
    }
    const dialogRef = this.dialog.open(CctransactionDialogComponent, {
      width: '500px',
      data: {
        title: this.modalTitle,
        transaction: transaction
      }
    });   

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.snackBar.open("Added Transaction", "Success", {
          duration: 2000,
        });
      }
    });
  }  
}