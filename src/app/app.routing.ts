import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from "./user-create/user-create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProjectCreateComponent } from "./project-create/project-create.component";
import { ProjectViewComponent } from "./project-view/project-view.component";
import { SessionViewComponent } from "./session-view/session-view.component";
import { GoalViewComponent } from "./goal-view/goal-view.component";
import { CanDeactivateGuard } from "./services/can-deactivate-guard.service";

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
    component: ProjectCreateComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'viewallprojects',
    component: ProjectViewComponent
  },
  {
    path: 'goalsview',
    component: GoalViewComponent
  },
  {
    path: 'sessionview',
    component: SessionViewComponent
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },





];
