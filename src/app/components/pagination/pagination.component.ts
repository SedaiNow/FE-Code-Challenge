import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="pagination">
      <button class="button button_secondary pagination__first" (click)="firstPage()"><<</button>
      <button class="button button_secondary pagination__prev" (click)="prevPage()"><</button>
      <span class="pagination__current">1</span>
      <button class="button button_secondary pagination__next" (click)="nextPage()">></button>
      <button class="button button_secondary pagination__last" (click)="lastPage()">>></button>
    </div>
  `,
  styles: [
    '.pagination { display: flex; justify-content: flex-end; gap: 15px;}',
    '.pagination__current {display: flex; align-items: center; justify-content: center; padding: 15px; border: 1px solid #000; border-radius: 4px; }'
  ],
})
export class PaginationComponent {
  @Input() current: number = 1;
  @Input() max: number = 1;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  firstPage() {
    this.change.emit(1);
  }

  prevPage() {
    const pageNum = this.current - 1;
    this.change.emit(pageNum ?? 1);
  }

  nextPage() {
    const pageNum = this.current + 1;
    this.change.emit( pageNum <= this.max ? pageNum : this.max);
  }

  lastPage() {
    this.change.emit(this.max);
  }
}
