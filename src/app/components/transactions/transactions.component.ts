import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../interface/transaction';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TransactionService } from '../../services/transaction.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddtransactionComponent } from '../addtransaction/addtransaction.component';
import { BalanceService } from '../../services/balance.service';
import { Balance } from '../../interface/balance';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interface/category';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionItemComponent, MatList, MatListItem,
    MatCardModule, MatDivider, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];
  private txnService: TransactionService = inject(TransactionService);

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.txnService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions.sort((a: Transaction, b: Transaction) => {
        return b.date.getTime() - a.date.getTime();
      });
    })
  }

  addTxn(transaction: Transaction): void {
    this.txnService.addTransaction(transaction).subscribe((txn) => {
      this.transactions.unshift(txn);
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddtransactionComponent, {
      height: '600px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((transaction) => {
      if (transaction !== '' && transaction !== undefined) {
        this.addTxn(transaction);
      }
    });
  }

}
