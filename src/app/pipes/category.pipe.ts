import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../interface/category';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  map = new Map<string, string>([
    ["Salary", "payments"],
    ["To get", "currency_exchange"],
    ["Credit", "account_balance_wallet"],
    ["Bank Deposit", "account_balance"],
    ["Investment", "savings"],
    ["Shopping", "shopping_cart"],
    ["Bills", "receipt_long"],
    ["Food & Drinks", "restaurant"],
    ["Entertainment", "hub"],
    ["Groceries", "shopping_basket"],
    ["spend", "call_made"],
    ["income", "call_received"]
  ]);

  transform(value: string): string | undefined {
    return this.map.get(value);
  }

}
