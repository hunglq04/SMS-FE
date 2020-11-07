import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Page } from '../model/page.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  page: Page;
  @Output()
  newPage = new EventEmitter<number>();

  items: number[];
  currentPage = 0;
  first = true;
  last = false;

  constructor() {
    this.page = new Page();
   }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.updateItems(this.page?.totalPages);
    this.currentPage = this.page?.number;
    this.first = this.page?.first;
    this.last = this.page?.last;
  }

  updateItems(totalPages) {
    this.items = [];
    for (let page = 0; page < totalPages; page++) {
      this.items.push(page);
    }
  }

  pageChange(page, isDisabled) {
    if(isDisabled) return;
    this.currentPage = page;
    this.newPage.emit(page);
  }

}
