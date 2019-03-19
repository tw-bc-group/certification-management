import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  photo: string;

  photoChanged(files: FileList): void {
    this.revokeUrl();
    this.photo = URL.createObjectURL(files.item(0));
  }

  private revokeUrl() {
    if (this.photo) {
      URL.revokeObjectURL(this.photo);
    }
  }

  ngOnDestroy(): void {
    this.revokeUrl();
  }
}
