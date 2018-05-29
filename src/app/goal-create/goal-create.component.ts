import { Component, OnInit } from '@angular/core';
import { GoalApiService } from "../services/goal-api.service";

@Component({
  selector: 'app-goal-create',
  templateUrl: './goal-create.component.html',
  styleUrls: ['./goal-create.component.scss']
})
export class GoalCreateComponent implements OnInit {

  constructor(private goalApiService: GoalApiService) { }
  goalTaskCount = 0;
  goalTaskArr = [];
  errMsg = "";
  userInfo;

  ngOnInit() {
    this.addGoalTask()
  }

  addGoalTask() {
    this.goalTaskCount++
    var taskObj = {
      taskTitle: "taskTitle" + this.goalTaskCount,
      taskDescription: "taskDescription" + this.goalTaskCount
    };
    this.goalTaskArr.push(taskObj);
  }

  createGoal(form) {
    console.log(form.value);
    const goalInfo = form.value;
    if(goalInfo.newGoalTitle == '' || goalInfo.newGoalTitle == null) {
      this.errMsg = "You must enter a title for your goal";
      return;
    }
    let goalTaskInfo = [];

    for(var i = 0; i < this.goalTaskArr.length; i++) {
      let goalTaskTitle = goalInfo[this.goalTaskArr[i].taskTitle];
      let goalTaskDescription = goalInfo[this.goalTaskArr[i].taskDescription];
      let goalTaskObj = {
        taskTitle: goalTaskTitle,
        taskDescription: goalTaskDescription
      }
      if((goalTaskObj.taskTitle == '' || goalTaskObj.taskTitle == null) && (goalTaskObj.taskDescription == '' || goalTaskObj.taskDescription == null)) {
        console.log("nothing entered");
      } else {
      goalTaskInfo.push(goalTaskObj);
      }
    }
    if(goalTaskInfo.length == 0) {
      this.errMsg = "You must enter a task for your goal";
      return;
    }
    const goalInfoObj = {
      goalTitle: goalInfo.newGoalTitle,
      goalTask: goalTaskInfo
    }
    this.goalApiService.createGoal(goalInfoObj)
    .subscribe(
      (data: any) => {
        console.log("success: ", data);
        this.goalApiService.newGoalSubject.next(data);
        form.reset();
      },
      (err) => {
        console.log("there was an error: ", err);
      }
    )
  }
}
