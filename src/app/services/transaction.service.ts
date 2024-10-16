import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Transaction } from '../interface/transaction';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Balance } from '../interface/balance';
import { Category } from '../interface/category';
import { BalanceService } from './balance.service';
import { CategoryService } from './category.service';

const httpOptions = {
  'headers': new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = environment.apiUrl + '/transactions';

  private balanceService: BalanceService = inject(BalanceService);
  private balance!: Balance;

  private categoryService: CategoryService = inject(CategoryService);
  private categories!: Category;

  constructor(private http: HttpClient) {
    this.balanceService.balance$.subscribe((currentBal) => {
      this.balance = currentBal;
    })
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    })
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    if (transaction.type === 'spend') {
      this.balance.expense += transaction.amount;
    } else {
      this.balance.income += transaction.amount
    }
    let key: keyof Category | undefined = transaction.category;
    key && (this.categories[key] += 1);
    let $addTxn: Observable<Transaction> = this.http.post<Transaction>(this.apiUrl, transaction, httpOptions);
    this.updateAdditionals();
    return $addTxn;
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl).pipe(
      map(transactions =>
        transactions.map(transaction => ({
          ...transaction,
          date: new Date(transaction.date)
        }))
      )
    );
  }

  deleteTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${this.apiUrl}/${transaction.id}`;
    if (transaction.type === 'spend') {
      this.balance.expense -= transaction.amount;
    } else {
      this.balance.income -= transaction.amount
    }
    let key = transaction.category;
    key && (this.categories[key] -= 1);
    let $deleteTxn: Observable<Transaction> = this.http.delete<Transaction>(url);
    this.updateAdditionals();
    return $deleteTxn;
  }

  updateAdditionals() {
    this.balanceService.updateBalance(this.balance);
    this.categoryService.updateCategories(this.categories);
  }

}
