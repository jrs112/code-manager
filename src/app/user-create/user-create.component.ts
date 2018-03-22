import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../services/user-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  constructor(private userApiService: UserApiService, private router: Router ) { }

  errMsg = "";

  ngOnInit() {
  }

  onSubmit(form) {
    this.errMsg = "";
    if(form.value.password != form.value.userPassTwo) {
      this.errMsg = "The passwords entered do not match.  Please try again.";
      return;
    }
    this.userApiService.createUser(form.value)
    .subscribe(info => {
      console.log(info);
    },
    authRes => {
          console.log("Error occured: ", authRes.url);
          let urlPath = authRes.url;
          let urlPathArray = urlPath.split('/');
          let lastSegment = urlPathArray[urlPathArray.length - 1];
          if(lastSegment == "createuser") {
            this.errMsg = "There is already an account with this email.";
            return
          }
          this.router.navigate([lastSegment]);

        }
    );
  }
}
