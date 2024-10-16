import { Component, signal, computed, inject, viewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatError } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../interface/transaction';
import { Category } from '../../interface/category';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-addtransaction',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonToggleModule,
    FormsModule,
    MatDialogModule,
    MatError,
    MatChipsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './addtransaction.component.html',
  styleUrl: './addtransaction.component.scss',
})
export class AddtransactionComponent {
  readonly dialogRef = inject(MatDialogRef<AddtransactionComponent>);

  amount: number = 0;
  beneficiary: string = '';
  category!: keyof Category;
  date: Date = new Date();
  type = signal('spend');
  isSpend = computed(() => this.type() === 'spend');

  onSubmit() {
    const transaction: Transaction = {
      amount: this.amount,
      beneficiary: this.beneficiary,
      category: this.category,
      type: this.type(),
      date: this.date,
    };
    this.dialogRef.close(transaction);
  }
}
