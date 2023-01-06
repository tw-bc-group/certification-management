import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../utils/constants';
import {blobToDataURL} from 'blob-util';

@Component({
  selector: 'app-trainee-photo-upload',
  templateUrl: './trainee-photo-upload.component.html',
  styleUrls: ['./trainee-photo-upload.component.scss']
})
export class TraineePhotoUploadComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  uploading = false;

  @Input()
  photoUrl: string;

  @Output()
  photoChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  photoChanged(files: FileList): void {
    this.uploading = true;
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
        this.uploading = false;
        this.photoUrl = url;
        this.photoChange.emit(url);
      });
    });
  }

  deleteImg() {
    this.photoUrl = '';
    this.photoChange.emit('');
  }

}
