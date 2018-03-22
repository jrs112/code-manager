import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../services/user-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(private userApiService: UserApiService, private router:Router) { }

  ngOnInit() {
  }

  logout() {
    this.userApiService.logOutUser()
    .subscribe((info:any) => {
      console.log(info);
      this.router.navigate([info.url])
    });
  }

}
