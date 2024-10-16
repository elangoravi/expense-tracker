import { Component, inject, OnInit } from '@angular/core';
import { TransactionsComponent } from "../../transactions/transactions.component";
import { Balance } from '../../../interface/balance';
import { BalanceService } from '../../../services/balance.service';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [TransactionsComponent, MatCardModule, CurrencyPipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {

  private balanceService: BalanceService = inject(BalanceService);
  balance!: Balance;

  ngOnInit(): void {
    this.balanceService.balance$.subscribe((currentBal) => {
      this.balance = currentBal;
    })
  }

}
