import { Component, Input, OnInit } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';
import { blobToDataURL } from 'blob-util';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cert-form',
  templateUrl: './cert-form.component.html',
  styleUrls: ['./cert-form.component.scss'],
})
export class CertFormComponent implements OnInit {

  @Input()
  certificate: CertificateModel;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  photoChanged(files: FileList): void {
    const data = new FormData();
    data.set('image_file', files[0], files[0].name);
    data.set('size', 'auto');
    this.http.post('https://api.remove.bg/v1.0/removebg', data, {
      headers: {
        'X-Api-Key': '9FHqa9UnV4fYfPn7eVYEagvp',
      },
      responseType: 'blob',
    }).subscribe((blob) => {
      blobToDataURL(blob).then(url => {
        this.certificate.photoUrl = url;
      });
    });
  }
}
