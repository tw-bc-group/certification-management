import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovableDirective } from './directives/movable.directive';
import { ZoomDirective } from './directives/zoom.directive';
import { HttpClientModule } from '@angular/common/http';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MovableDirective,
    ZoomDirective,
    SafeResourceUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
