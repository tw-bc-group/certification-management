import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fetchCertificate} from '../utils/certificatesStorage';
import {MatPaginator} from '@angular/material/paginator';
import {CertificateDirectionOptions, CertificateTemplateOptions} from '../models/certificate.model';

interface Header {
  certificateTemplate: number;
  certDirection: string;
  partner: number;
  name: string;
}

@Component({
  selector: 'app-query-page',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss'],
})


export class QueryPageComponent implements OnInit {
  listOfData: Header[] = [
    {certificateTemplate: 1, certDirection: 'Hydrogen', partner: 1.0079, name: 'H'},
    {certificateTemplate: 2, certDirection: 'Helium', partner: 4.0026, name: 'He'},
    {certificateTemplate: 3, certDirection: 'Lithium', partner: 6.941, name: 'Li'},
    {certificateTemplate: 4, certDirection: 'Beryllium', partner: 9.0122, name: 'Be'},
    {certificateTemplate: 5, certDirection: 'Boron', partner: 10.811, name: 'B'},
    {certificateTemplate: 6, certDirection: 'Carbon', partner: 12.0107, name: 'C'},
    {certificateTemplate: 7, certDirection: 'Nitrogen', partner: 14.0067, name: 'N'},
    {certificateTemplate: 8, certDirection: 'Oxygen', partner: 15.9994, name: 'O'},
    {certificateTemplate: 9, certDirection: 'Fluorine', partner: 18.9984, name: 'F'},
    {certificateTemplate: 10, certDirection: 'Neon', partner: 20.1797, name: 'Ne'},
    {certificateTemplate: 11, certDirection: 'Sodium', partner: 22.9897, name: 'Na'},
    {certificateTemplate: 12, certDirection: 'Magnesium', partner: 24.305, name: 'Mg'},
    {certificateTemplate: 13, certDirection: 'Aluminum', partner: 26.9815, name: 'Al'},
    {certificateTemplate: 14, certDirection: 'Silicon', partner: 28.0855, name: 'Si'},
    {certificateTemplate: 15, certDirection: 'Phosphorus', partner: 30.9738, name: 'P'},
    {certificateTemplate: 16, certDirection: 'Sulfur', partner: 32.065, name: 'S'},
    {certificateTemplate: 17, certDirection: 'Chlorine', partner: 35.453, name: 'Cl'},
    {certificateTemplate: 18, certDirection: 'Argon', partner: 39.948, name: 'Ar'},
    {certificateTemplate: 19, certDirection: 'Potassium', partner: 39.0983, name: 'K'},
    {certificateTemplate: 20, certDirection: 'Calcium', partner: 40.078, name: 'Ca'},
  ];
  total = this.listOfData.length;

  constructor() {
  }

  searchText: string;

  // displayedColumns: string[] = ['certificateTemplate', 'certDirection', 'partner', 'name'];
  // dataSource = new MatTableDataSource<header>(ELEMENT_DATA);
  certificateTemplateOptions = CertificateTemplateOptions;
  certificateDirectionOptions = CertificateDirectionOptions;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }


  search(): void {
    const certId = this.searchText;
    const promise = fetchCertificate({certId});
    promise.then((resolved) => {
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
