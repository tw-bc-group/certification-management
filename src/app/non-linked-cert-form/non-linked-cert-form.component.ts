import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  CertificateModel,
  CertificateTemplateOptions,
  NonLinkedCertificateLevel,
  PartnerOptions
} from "../models/certificate.model";
import {Constants} from "../utils/constants";
import {blobToDataURL} from "blob-util";

@Component({
  selector: 'app-non-linked-cert-form',
  templateUrl: './non-linked-cert-form.component.html',
  styleUrls: ['./non-linked-cert-form.component.scss']
})
export class NonLinkedCertFormComponent implements OnInit {

  constructor(private http: HttpClient) {
  }
  uploadLoading = false;
  certificateLevelOptions = Object.keys(NonLinkedCertificateLevel).map((level) => ({
    value: NonLinkedCertificateLevel[level],
    label: NonLinkedCertificateLevel[level]
  }));
  certificateTemplateOptions = CertificateTemplateOptions.filter(option => option.value !== 'dpm');
  partnerOptions = PartnerOptions;
  @Input()
  certificate: CertificateModel;

  @Input()
  certificateTemplate: string;

  @Input()
  isLinkedCertificate: boolean;

  @Output()
  certificateTemplateChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  changeTemplate(value: string) {
    this.certificate.partner = null;
    this.certificateTemplateChange.emit(value);
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
