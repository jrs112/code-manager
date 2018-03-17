import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from "./user-create/user-create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const routes: Routes = [


  {
    path: 'createuser',
    component: UserCreateComponent
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },





];
