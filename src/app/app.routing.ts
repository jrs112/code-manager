import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from "./user-create/user-create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProjectCreateComponent } from "./project-create/project-create.component";
import { ProjectViewComponent } from "./project-view/project-view.component";

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
    path: 'createproject',
    component: ProjectCreateComponent
  },
  {
    path: 'viewallprojects',
    component: ProjectViewComponent
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },





];
