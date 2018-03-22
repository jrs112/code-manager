import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../services/user-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = "";

  constructor(private userApiService: UserApiService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.errorMessage = "";
    console.log(form.value);
    this.userApiService.logInUser(form.value)
    .subscribe(info => {
      console.log(info);

    },
  (authRes) =>  {
    console.log(authRes);
    console.log(authRes.url);
    let urlPath = authRes.url;
    let urlPathArray = urlPath.split('/');
    let lastSegment = urlPathArray[urlPathArray.length - 1];
    console.log(lastSegment);
    if(lastSegment == "") {
      this.errorMessage = "Incorrect Login Information"
      return;
    }

    this.router.navigate([lastSegment]);
  }
  );

  }

}
