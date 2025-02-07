import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import * as d3 from 'd3';
import {DataItem} from '../../types/data.types';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {FilterState} from '../../types/filter.types';
import {StoreTypes} from '../../types/store.types';
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from './d3-chart-config';
import {TooltipService} from './services/tooltip.service';

@Component({
  selector: 'app-d3-chart',
  standalone: false,
  templateUrl: './d3-chart.component.html',
  styleUrl: './d3-chart.component.less',
})
export class D3ChartComponent implements OnInit, OnDestroy {
  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef;
  @ViewChild('barChart', { static: false }) barChart!: ElementRef;

  private store: Store<StoreTypes> = inject(Store);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private tooltipService: TooltipService = inject(TooltipService);

  public filteredData$: Observable<FilterState> = this.store.select(state => state.filteredData);
  public data: Array<DataItem> = [];
  private subscriptions: Subscription = new Subscription();

  public ngOnInit(): void {
    this.initSubscriptions();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSubscriptions(): void {
    this.subscriptions.add(
      this.filteredData$.subscribe((filterState: FilterState) => this.initFilterState(filterState))
    );
  }

  private initFilterState(filterState: FilterState): void {
    if (!filterState.filteredData?.length) { return; }
    this.data = filterState.filteredData;
    this.createPieChart(this.data);
    this.createBarChart(this.data);
    this.cdr.detectChanges();
  }

  private createPieChart(data: Array<DataItem>): void {
    const radius = Math.min(DEFAULT_WIDTH, DEFAULT_HEIGHT) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.select(this.pieChart?.nativeElement).selectAll('*').remove();

    const svg = d3.select(this.pieChart?.nativeElement)
      .attr('width', DEFAULT_WIDTH)
      .attr('height', DEFAULT_HEIGHT)
      .append('g')
      .attr('transform', `translate(${DEFAULT_WIDTH / 2}, ${DEFAULT_HEIGHT / 2})`);

    const pie = d3.pie<DataItem>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<DataItem>>().innerRadius(0).outerRadius(radius);

    const paths: d3.Selection<SVGPathElement, d3.PieArcDatum<DataItem>, SVGGElement, unknown> = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(String(i)));

    this.tooltipService.setupTooltip(paths);
  }

  private createBarChart(data: Array<DataItem>): void {
    const margin = 20;
    const chartWidth = DEFAULT_WIDTH - (margin * 2);
    const chartHeight = DEFAULT_HEIGHT - (margin * 2);

    d3.select(this.barChart?.nativeElement).selectAll('*').remove();

    const svg = d3.select(this.barChart?.nativeElement)
      .attr('width', DEFAULT_WIDTH)
      .attr('height', DEFAULT_HEIGHT)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, chartWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([chartHeight, 0]);

    const bars: d3.Selection<SVGRectElement, DataItem, SVGGElement, unknown> = svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.category)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => chartHeight - y(d.value))
      .attr('fill', 'steelblue');

    this.tooltipService.setupTooltip(bars);

    svg.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }
}
