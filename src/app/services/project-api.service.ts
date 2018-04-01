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

  deleteProject(info) {
    return this.http.post("/dataproject/deleteproject", info);
  }

  deleteProjectTask(info) {
    return this.http.put("/dataproject/removeprojecttask", info);
  }

  deleteFeatureTask(info) {
    return this.http.put("/dataproject/removefeaturetask", info);
  }

  deleteFeature(info) {
    return this.http.put("/dataproject/removeprojectfeature", info);
  }


}
