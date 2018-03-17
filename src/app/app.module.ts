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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserCreateComponent,
    DashboardComponent
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
  providers: [UserApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
