import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-query-page',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss'],
})
export class QueryPageComponent implements OnInit {
  searchText: string;

  constructor(private message: NzMessageService) {
  }

  search(): void {
    console.log('==========', this.searchText);
  }

  initSearchText(): void {
    this.searchText = '';
  }

  ngOnInit(): void {
    this.initSearchText();
  }


}
