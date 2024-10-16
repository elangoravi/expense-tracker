import { Routes } from '@angular/router';
import { OverviewComponent } from './components/screens/overview/overview.component';
import { AnalyticsComponent } from './components/screens/analytics/analytics.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'transactions', component: TransactionsTableComponent },
];