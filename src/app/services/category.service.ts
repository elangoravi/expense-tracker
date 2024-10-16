import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../interface/category';


const httpOptions = {
  'headers': new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl + '/category';

  private categoriesSubject = new BehaviorSubject<Category>({
    "Salary": 0,
    "To get": 0,
    "Credit": 0,
    "Bank Deposit": 0,
    "Investment": 0,
    "Shopping": 0,
    "Bills": 0,
    "Food & Drinks": 0,
    "Entertainment": 0,
    "Groceries": 0,
  });
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchCategories();
  }

  fetchCategories() {
    return this.http.get<Category>(this.apiUrl).subscribe(
      (categories) => {
        this.categoriesSubject.next(categories);
      }
    );
  }

  updateCategories(categories: Category) {
    return this.http.put<Category>(this.apiUrl, categories).subscribe(
      (categories) => {
        this.categoriesSubject.next(categories);
      }
    );
  }

}
