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

  deleteGoal(info) {
    return this.http.post("/datagoal/deletegoal", info);
  }

  updateGoal(id, info) {
    return this.http.put("/datagoal/updategoal/" + id, info);
  }



  deleteGoalTask(info) {
    return this.http.put("/datagoal/removegoaltask", info);
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
