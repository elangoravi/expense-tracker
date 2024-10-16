import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../interface/transaction';
import { TransactionService } from '../../services/transaction.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CategoryPipe } from '../../pipes/category.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeletetransactionComponent } from '../deletetransaction/deletetransaction.component';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [MatTableModule, MatCardModule, DatePipe, CurrencyPipe, CategoryPipe, MatIcon,
    MatSortModule, CdkDrag, CdkDropList, FaIconComponent, MatDialogModule
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent implements OnInit {

  private txnService: TransactionService = inject(TransactionService);
  private dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;

  transactions: Transaction[] = [];
  dataSource = new MatTableDataSource<Transaction>(this.transactions);
  displayedColumns: string[] = ["type", "beneficiary", "amount", "category", "date", "delete"]

  faTrash = faTrash;

  ngOnInit(): void {
    this.txnService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions.sort((a: Transaction, b: Transaction) => {
        return b.date.getTime() - a.date.getTime();
      });
      this.dataSource.data = this.transactions;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  onDelete(transaction: Transaction): void {
    this.txnService.deleteTransaction(transaction).subscribe((deletedTxn) => {
      this.transactions = this.transactions.filter(transaction => transaction.id !== deletedTxn.id);
      this.dataSource.data = this.transactions;
    })
  }

  openDeleteDialog(transaction: Transaction) {
    const dialogRef = this.dialog.open(DeletetransactionComponent, {
      height: '300px',
      width: '400px'
    },);

    dialogRef.afterClosed().subscribe((deleted: boolean) => {
      if (deleted) {
        this.onDelete(transaction);
      }
    });
  }

}
