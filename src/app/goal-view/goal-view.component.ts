import { Component, OnInit } from '@angular/core';
import { GoalApiService } from "../services/goal-api.service";

@Component({
  selector: 'app-goal-view',
  templateUrl: './goal-view.component.html',
  styleUrls: ['./goal-view.component.scss']
})
export class GoalViewComponent implements OnInit {

  constructor(private goalApiService: GoalApiService) { }

  allGoals = [];
  currentGoals = [];
  showAdd = false;
  showUpdate = false;
  showAddGoal = false;

  ngOnInit() {
    this.getUserGoals();
    if(this.allGoals.length == 0) {
      this.showAddGoal = true;
    }
    this.goalApiService.newGoalSubject
    .subscribe(
      (data: any) => {
        this.allGoals.push(data);
      }
    )
  }

  isActive(goal) {
    for (var i = 0; i < this.currentGoals.length; i++) {
      if (goal._id == this.currentGoals[i]._id) {
        return true;
      }
    }
      return false;
  }

  addGoal() {
    this.currentGoals = [];
    this.showAddGoal = true;
  }

  selectCurrentGoal(selectedGoal) {
    this.currentGoals = [];
    this.showAddGoal = false;
    this.showUpdate = false;
    this.showAdd = false;
    this.currentGoals.push(selectedGoal);
    console.log(this.currentGoals);
  }

  updateDisplay(updateBool: boolean, addBool: boolean) {
    this.showUpdate = updateBool;
    this.showAdd = addBool;
  }

  getUserGoals() {
    this.allGoals = [];
    this.goalApiService.getUserGoals()
    .subscribe(
      (goalsData: any) => {
        console.log("goal results", goalsData);
        this.allGoals = goalsData;
      },
      (err) => {
        console.log("error getting goals", err);
      }
    )
  }

}
