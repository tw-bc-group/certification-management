import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {blobToDataURL} from 'blob-util';

@Component({
  selector: 'app-logo-photo-upload',
  templateUrl: './logo-photo-upload.component.html',
  styleUrls: ['./logo-photo-upload.component.scss']
})
export class LogoPhotoUploadComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  uploading = false;

  @Input()
  logoUrl: string;

  @Output()
  photoChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }


  photoChanged(files: FileList): void {
    this.uploading = true;
    blobToDataURL(files[0]).then(url => {
        this.uploading = false;
        this.logoUrl = url;
        this.photoChange.emit(url);
      }
    );
  }

  deleteImg() {
    this.logoUrl = '';
    this.photoChange.emit('');
  }

}
