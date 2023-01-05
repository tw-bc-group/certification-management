import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {fetchCertificate} from '../utils/certificatesStorage';


@Component({
  selector: 'app-query-page',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss'],
})
export class QueryPageComponent implements OnInit {
  searchText: string;

  constructor(private message: NzMessageService) {
  }

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();


  search(): void {
    console.log('certId: ', this.searchText);
    const certId = this.searchText;
    const promise = fetchCertificate({certId});
    promise.then((resolved) => {
      // @ts-ignore
      console.log('query result: ', resolved[0].attributes);
      // @ts-ignore
      this.valueChange.emit(resolved[0].attributes);
    }).catch(err => {
      console.log(err);
    });
  }

  initSearchText(): void {
    this.searchText = '';
  }

  ngOnInit(): void {
    this.initSearchText();
  }


}
