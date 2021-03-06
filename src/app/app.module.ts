import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routing';
import { keyframes } from '@angular/core/src/animation/dsl';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserApiService } from "./services/user-api.service";
import { ProjectApiService } from "./services/project-api.service";
import { GoalApiService } from "./services/goal-api.service";
import { CanDeactivateGuard } from "./services/can-deactivate-guard.service";
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { SessionViewComponent } from './session-view/session-view.component';
import { GoalViewComponent } from './goal-view/goal-view.component';
import { GoalCreateComponent } from './goal-create/goal-create.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserCreateComponent,
    DashboardComponent,
    NavMenuComponent,
    ProjectCreateComponent,
    ProjectViewComponent,
    SessionViewComponent,
    GoalViewComponent,
    GoalCreateComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UserApiService, ProjectApiService, GoalApiService, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
