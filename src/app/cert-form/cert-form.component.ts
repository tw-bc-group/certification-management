import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CertificateModel, CertificateType } from '../models/certificate.model';
import { blobToDataURL } from 'blob-util';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../utils/constants';

@Component({
  selector: 'app-cert-form',
  templateUrl: './cert-form.component.html',
  styleUrls: ['./cert-form.component.scss'],
})
export class CertFormComponent implements OnInit {

  constructor(private http: HttpClient) {
  }
  uploadLoading = false;

  @Input()
  certificate: CertificateModel;

  @Input()
  certificateTemplate: string;

  @Output()
  certificateTemplateChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  changeTemplate(value: string) {
    this.certificate.partner = null;
    this.certificateTemplateChange.emit(value);
  }

  isThoughtworksCert(): boolean {
    return this.certificate.type === CertificateType.ThoughtWorks;
  }

  photoChanged(files: FileList): void {
    this.uploadLoading = true;
    const data = new FormData();
    data.set('image_file', files[0], files[0].name);
    data.set('size', 'auto');
    this.http.post('https://api.remove.bg/v1.0/removebg', data, {
      headers: {
        'X-Api-Key': Constants.REMOVE_BG_API_KEY
      },
      responseType: 'blob',
    }).subscribe((blob) => {
      blobToDataURL(blob).then(url => {
        this.uploadLoading = false;
        this.certificate.photoUrl = url;
      });
    });
  }

  deleteImg() {
    this.certificate.photoUrl = '';
  }
}
