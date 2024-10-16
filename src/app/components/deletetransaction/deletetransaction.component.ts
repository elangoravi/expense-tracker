import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-deletetransaction',
  standalone: true,
  imports: [MatDialogModule, MatIcon, MatButtonModule],
  templateUrl: './deletetransaction.component.html',
  styleUrl: './deletetransaction.component.scss',
})
export class DeletetransactionComponent {

  readonly dialogRef = inject(MatDialogRef<DeletetransactionComponent>);

  onDelete() {
    this.dialogRef.close(true);
  }

}
