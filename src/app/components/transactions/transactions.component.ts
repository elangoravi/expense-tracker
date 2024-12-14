import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../interface/transaction';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TransactionService } from '../../services/transaction.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionItemComponent, MatList, MatListItem,
    MatCardModule, MatDivider, MatButtonModule, MatIconModule,
    RouterLink],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  transactions: Transaction[] = [];
  private txnService: TransactionService = inject(TransactionService);

  ngOnInit(): void {
    this.txnService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions.sort((a: Transaction, b: Transaction) => {
        return b.date.getTime() - a.date.getTime();
      });
      this.transactions.splice(4);
    })
  }


  // TODO : Change transaction to be observable else wont change when txns array changes
}
