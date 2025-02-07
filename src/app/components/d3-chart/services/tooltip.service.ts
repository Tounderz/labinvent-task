import { Injectable } from '@angular/core';
import {DataItem} from '../../../types/data.types';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  public setupTooltip(element: any): void {
    element
      .on('mouseover', (event: MouseEvent, d: DataItem | d3.PieArcDatum<DataItem>) => {
        this.showTooltip(event, d);
      })
      .on('mousemove', (event: MouseEvent) => {
        this.updateTooltipPosition(event);
      })
      .on('mouseout', () => {
        this.hideTooltip();
      });
  }

  private showTooltip(event: MouseEvent, d: DataItem | d3.PieArcDatum<DataItem>): void {
    d3.select('#tooltip')
      .style('visibility', 'visible')
      .style('opacity', 1)
      .style('top', `${event.clientY + window.scrollY + 10}px`)
      .style('left', `${event.clientX + window.scrollX + 10}px`)
      .text(`${'data' in d ? d.data.category : d.category}: ${'data' in d ? d.data.value : d.value}`);
  }

  private updateTooltipPosition(event: MouseEvent): void {
    d3.select('#tooltip')
      .style('top', `${event.clientY + window.scrollY + 10}px`)
      .style('left', `${event.clientX + window.scrollX + 10}px`);
  }

  private hideTooltip(): void {
    d3.select('#tooltip')
      .style('visibility', 'hidden')
      .style('opacity', 0)
      .style('top', 0)
      .style('left', 0);
  }
}
