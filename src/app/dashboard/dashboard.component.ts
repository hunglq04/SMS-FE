import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public series: any[] = [{
    name: 'India',
    data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
  }, {
    name: 'Russian Federation',
    data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
  }, {
    name: 'Germany',
    data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
  }, {
    name: 'World',
    data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
  }];
  public categories: number[] = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];

  constructor() { }

  ngOnInit(): void {
  }

  public autofit = true;
  public data: any[] = [{
    kind: 'Uốn tạo phồng', share: 0.118
  }, {
    kind: 'Kid combo', share: 0.225
  }, {
    kind: 'Dịch vụ khác', share: 0.192
  }, {
    kind: 'Phụ hồi nano', share: 0.175
  }, {
    kind: 'Shine combo', share: 0.238
  }, {
    kind: 'Detox da đầu', share: 0.052
  }];

  public data1: any[] = [{
    kind: 'Sáp Reuzel', share: 0.5
  }, {
    kind: 'Gôm R&B', share: 0.3
  }, {
    kind: 'Sản phẩm khác', share: 0.2
  }, {
    kind: 'TEATREE SPECIAL', share: 0.1
  }];

  public labelContent(e: any): string {
    return e.category;
  }

}
