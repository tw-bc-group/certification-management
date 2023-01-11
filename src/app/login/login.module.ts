import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {
  NZ_MESSAGE_CONFIG,
  NzButtonModule,
  NzCardModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMessageModule,
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzCardModule,
    NzButtonModule,
    NzLayoutModule,
    NzIconModule,
    NzMessageModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 0, nzMaxStack: 1 }}]
})
export class LoginModule { }
