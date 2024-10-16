import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [BaseChartDirective, MatCardModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {

  private categoryService: CategoryService = inject(CategoryService);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  ngOnInit(): void {
    this.categoryService.categories$.subscribe((category) => {
      let lables: string[] = Object.keys(category);
      let data: number[] = Object.values(category);
      this.chartData.labels = lables;
      this.chartData.datasets = [{ 'data': data }];
      if (this.chart) {
        this.chart.update();
      }
    })
  }

  chartType: ChartType = 'doughnut';
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  chartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

}
