import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Transaction } from '../../interface/transaction';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CategoryPipe } from '../../pipes/category.pipe';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    MatIcon,
    CurrencyPipe,
    CategoryPipe
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItemComponent {

  @Input() transaction!: Transaction;

}
