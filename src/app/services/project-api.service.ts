import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class ProjectApiService {

    constructor(private http: HttpClient) { }

  createProject(userInfo) {
   return this.http.post("/dataproject/createproject", userInfo);
  }

  getUserProjects() {
    return this.http.get("/dataproject/alluserprojects");
  }

  updateProject(id, info) {
    return this.http.put("/dataproject/updateproject/" + id, info);
  }


}
