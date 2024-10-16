import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Balance } from '../interface/balance';


const httpOptions = {
  'headers': new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private apiUrl = environment.apiUrl + '/balance';
  private balanceSubject = new BehaviorSubject<Balance>({
    expense: 0,
    income: 0
  });

  balance$ = this.balanceSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchBalance();
  }

  private fetchBalance(): void {
    this.http.get<Balance>(this.apiUrl).subscribe((balance) => {
      this.balanceSubject.next(balance);
    });
  }

  updateBalance(balance: Balance): void {
    this.http.put<Balance>(this.apiUrl, balance).subscribe(bal => {
      this.balanceSubject.next(bal);
    });
  }

} 
