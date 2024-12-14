import { Component } from '@angular/core';
import { OverviewComponent } from '../overview/overview.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OverviewComponent,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent { }
