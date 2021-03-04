import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Constants} from "../utils/constants";
import {blobToDataURL} from "blob-util";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  constructor(private http: HttpClient) { }

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
