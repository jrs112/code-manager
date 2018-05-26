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
  showDeleteGoal = false;
  showGoalTaskForm = false;


  ngOnInit() {
    this.getUserGoals();
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
    this.showGoalTaskForm = addBool;
  }

  getUserGoals() {
    this.allGoals = [];
    this.goalApiService.getUserGoals()
    .subscribe(
      (goalsData: any) => {
        console.log("goal results", goalsData);
        this.allGoals = goalsData;
        if(this.allGoals.length == 0) {
          this.showAddGoal = true;
        }
      },
      (err) => {
        console.log("error getting goals", err);
      }
    )
  }

  deleteGoal(goal) {
    var deleteInfo = {
      _id: goal._id
    };
    this.goalApiService.deleteGoal(deleteInfo)
    .subscribe(
      (data: any[]) => {
        console.log("success", data);
        this.getUserGoals();
        this.currentGoals = [];
      }
    )
  }

  deleteGoalTask(goal, task, goalIndex, taskIndex) {
    console.log("goal", goal);
    console.log("task", task);
    var taskUpdateObj = {
      _id: goal._id,
      taskId: task._id
    }
    this.goalApiService.deleteGoalTask(taskUpdateObj)
    .subscribe(
      (deleteInfo: any[]) => {
        console.log(deleteInfo);
        this.currentGoals[goalIndex].goalTask.splice(taskIndex, 1);
        this.updateSideBar(this.currentGoals[goalIndex]);
      },
      (err) => console.log("error", err)
    )
  }

  updateGoalTitle(goalIndex, titleForm) {
    var updateObj = this.currentGoals[goalIndex];
    if (titleForm.value.newGoalTitle == '' || titleForm.value.newGoalTitle == null) {
      console.log('nothing');
      return;
    } else {
        updateObj.goalTitle = titleForm.value.newGoalTitle;
    }
    this.goalApiService.updateGoal(updateObj._id, updateObj)
    .subscribe(
      (res: any) => {
        console.log("success", res)
        this.selectCurrentGoal(res);
        this.updateSideBar(res);
      },
      (error) => console.log(error)
      );
  }

  updateGoalTask(goalIndex, taskIndex, bool) {
    var updateObj = this.currentGoals[goalIndex];
    updateObj.goalTask[taskIndex].taskCompleted = bool;
    console.log(updateObj);
    this.goalApiService.updateGoal(updateObj._id, updateObj)
    .subscribe(
      (res: any) => {
        console.log("success", res)
        this.selectCurrentGoal(res);
        this.updateSideBar(res);
      },
      (error) => console.log(error)
      );
  }

  addGoalTask(goalIndex, form) {
    var updateObj = this.currentGoals[goalIndex];
    var newTaskObj = {
      taskTitle: form.value.newGoalTaskTitle,
      taskDescription: form.value.newGoalTaskDescription
    }
    if ((newTaskObj.taskTitle == '' || newTaskObj.taskTitle == null) && (newTaskObj.taskDescription == '' || newTaskObj.taskDescription == null)) {
      console.log('nothing');
      return;
    }
    updateObj.goalTask.push(newTaskObj);
    this.goalApiService.updateGoal(updateObj._id, updateObj)
    .subscribe(
      (data: any[]) => {
        console.log("success", data)
        this.selectCurrentGoal(data);
        this.updateSideBar(data);
        this.showGoalTaskForm = false;
      },
      (error) => console.log(error)
      );
  }

  updateSideBar(newInfo) {
    for(var i = 0; i < this.allGoals.length; i++) {
      if(newInfo._id == this.allGoals[i]._id) {
        this.allGoals[i] = newInfo;
      }
    }
  }

}
