import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class UserApiService {

  constructor(private http: HttpClient) { }

  createUser(userInfo) {
   return this.http.post("/auth/createuser", userInfo);

  }

  logInUser(post) {
    return this.http.post("/auth/login", post);
  }

  logOutUser() {
    return this.http.get("/auth/logout");
  }


}
