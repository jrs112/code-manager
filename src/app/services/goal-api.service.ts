import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs/Subject";

@Injectable()

export class GoalApiService {

    constructor(private http: HttpClient) { }

  createGoal(goalInfo) {
   return this.http.post("/datagoal/creategoal", goalInfo);
  }

  newGoalSubject = new Subject();

  getUserGoals() {
    return this.http.get("/datagoal/allusergoals");
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

  deleteStory(info) {
    return this.http.put("/dataproject/removeprojectstory", info);
  }


}
