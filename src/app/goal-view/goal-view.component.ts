import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-view',
  templateUrl: './goal-view.component.html',
  styleUrls: ['./goal-view.component.scss']
})
export class GoalViewComponent implements OnInit {

  constructor() { }

  allGoals = [];
  showAdd = false;
  showUpdate = false;
  showAddGoal = false;

  ngOnInit() {
    if(this.allGoals.length == 0) {
      this.showAddGoal = true;
    }
  }

  isActive(goal) {

  }

  addGoal() {
    if(this.showAddGoal) {
      this.showAddGoal = false;
    } else {
      this.showAddGoal = true;
    }
  }

  updateDisplay(updateBool: boolean, addBool: boolean) {
    this.showUpdate = updateBool;
    this.showAdd = addBool;
  }

}
