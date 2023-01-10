import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CertificationManagementComponent } from './certification-management/certification-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'certification-management', component: CertificationManagementComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
