import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
  OnDestroy, ChangeDetectorRef
} from '@angular/core';
import * as d3 from 'd3';
import {DataItem} from '../../types/data.types';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {FilterState} from '../../types/filter.types';
import {StoreTypes} from '../../types/store.types';

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

  public filteredData$: Observable<FilterState> = this.store.select(state => state.filteredData);
  public data: Array<DataItem> = [];
  private subscriptions: Subscription = new Subscription();
  private readonly defaultWidth = 400;
  private readonly defaultHeight = 400;

  public ngOnInit(): void {
    this.initSubscribe();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSubscribe(): void {
    this.subscriptions.add(
      this.filteredData$.subscribe(data => {
          if (data.filteredData?.length) {
            this.data = data.filteredData;
            this.createPieChart(this.data);
            this.createBarChart(this.data);
          }

        this.cdr.detectChanges();
        })
    );
  }

  private createPieChart(data: Array<DataItem>): void {
    const radius = Math.min(this.defaultWidth, this.defaultHeight) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.select(this.pieChart?.nativeElement).selectAll('*').remove();

    const svg = d3.select(this.pieChart?.nativeElement)
      .attr('width', this.defaultWidth)
      .attr('height', this.defaultHeight)
      .append('g')
      .attr('transform', `translate(${this.defaultWidth / 2}, ${this.defaultHeight / 2})`);

    const pie = d3.pie<DataItem>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<DataItem>>().innerRadius(0).outerRadius(radius);

    const paths: d3.Selection<SVGPathElement, d3.PieArcDatum<DataItem>, SVGGElement, unknown> = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(String(i)));

    this.setupTooltip(paths);
  }

  private createBarChart(data: Array<DataItem>): void {
    const margin = 20;
    const chartWidth = this.defaultWidth - (margin * 2);
    const chartHeight = this.defaultHeight - (margin * 2);

    d3.select(this.barChart?.nativeElement).selectAll('*').remove();

    const svg = d3.select(this.barChart?.nativeElement)
      .attr('width', this.defaultWidth)
      .attr('height', this.defaultHeight)
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

    this.setupTooltip(bars);

    svg.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }

  private setupTooltip(element: any): void {
    element
      .on('mouseover', (event: MouseEvent, d: DataItem | d3.PieArcDatum<DataItem>) => {
        d3.select('#tooltip')
          .style('visibility', 'visible')
          .style('opacity', 1)
          .style('top', `${event.clientY + window.scrollY + 10}px`)
          .style('left', `${event.clientX + window.scrollX + 10}px`)
          .text(`${'data' in d ? d.data.category : d.category}: ${'data' in d ? d.data.value : d.value}`);
      })
      .on('mousemove', function (event: MouseEvent) {
        d3.select('#tooltip')
          .style('top', `${event.clientY + window.scrollY + 10}px`)
          .style('left', `${event.clientX + window.scrollX + 10}px`);
      })
      .on('mouseout', () => {
        d3.select('#tooltip')
          .style('visibility', 'hidden')
          .style('opacity', 0)
          .style('top', 0)
          .style('left', 0);
      });
  }
}
