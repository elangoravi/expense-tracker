import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionItemComponent } from "./components/transaction-item/transaction-item.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { HomeComponent } from "./components/screens/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionItemComponent, TransactionsComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'expense-tracker';
}
