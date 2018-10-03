import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { Transaction } from './cctransaction.model';
import { CctransactionService } from './cctransaction.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-cctransaction',
  templateUrl: './cctransaction.component.html',
  styleUrls: ['./cctransaction.component.css']
})
export class CctransactionComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'type', 'amount', 'description', 'postDate', 'transDate'];
  dataSource = new MatTableDataSource<Transaction>();
  filterValue = "";
  selection = new SelectionModel<Transaction>(true, []);
  showSpinner: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cctransactionService: CctransactionService) { }

  ngAfterViewInit() {
    this.cctransactionService.getTransactions().subscribe(data => {
      this.dataSource.data = data;      
      this.showSpinner = false;
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

}