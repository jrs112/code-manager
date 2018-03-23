import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from "../services/project-api.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  constructor(private projectApiService: ProjectApiService) { }

  currentProjects = [];
  showProjTaskForm = false;
  showFeatForm = false;

  ngOnInit() {
    this.updateCurrentProjects();

  }

  updateCurrentProjects() {
    this.projectApiService.getUserProjects()
      .subscribe(
        (order: any[]) => {
          this.currentProjects = order;
          console.log(this.currentProjects);
          for (var i = 0; i < this.currentProjects.length; i++) {
            for (var j = 0; j < this.currentProjects[i].projectFeature.length; j++) {
              this.currentProjects[i].projectFeature[j].addTask = false;
            }
          }
        },
        (error) => console.log(error)
        );
  }

  updateProjTask(projIndex, taskIndex, bool) {
    var updateObj = this.currentProjects[projIndex];
    updateObj.projectTask[taskIndex].taskCompleted = bool;
    console.log(updateObj);
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (res: any[]) => {
        console.log("success", res)
        this.updateCurrentProjects();
      },
      (error) => console.log(error)
      );
  }

  updateFeatureTask(projIndex, featureIndex, taskIndex, bool) {
    var updateObj = this.currentProjects[projIndex];
    updateObj.projectFeature[featureIndex].featureTask[taskIndex].featureTaskCompleted = bool;
    console.log("test obj: ", updateObj);
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (data: any[]) => {
        console.log("success", data)
        this.updateCurrentProjects();
      },
      (error) => console.log(error)
      );
  }

  addFeatTaskForm(event) {
    console.log(event);
    for (var i = 0; i < this.currentProjects.length; i++) {
      for (var j = 0; j < this.currentProjects[i].projectFeature.length; j++) {
        this.currentProjects[i].projectFeature[j].addTask = false;
      }
    }
    event.addTask = true;
  }

  cancelAddTask(event) {
    event.addTask = false;
  }

  addFeatureTask(projectIndex, featureIndex, form) {
    var updateObj = this.currentProjects[projectIndex];
    var newTaskObj =  {
      featureTaskTitle: form.value.newFeatureTaskTitle,
      featureTaskDescription: form.value.newFeatureTaskDescription
    }
    updateObj.projectFeature[featureIndex].featureTask.push(newTaskObj);
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (data: any[]) => {
        console.log("success", data)
        this.updateCurrentProjects();
      },
      (error) => console.log(error)
      );
  }

  addProjTask(projectIndex, form) {
    var updateObj = this.currentProjects[projectIndex];
    var newTaskObj = {
      taskTitle: form.value.newProjTaskTitle,
      taskDescription: form.value.newProjTaskDescription
    }
    updateObj.projectTask.push(newTaskObj);
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (data: any[]) => {
        console.log("success", data)
        this.updateCurrentProjects();
        this.showProjTaskForm = false;
      },
      (error) => console.log(error)
      );
  }

  addProjFeature(projectIndex, form) {
    var updateObj = this.currentProjects[projectIndex];
    var newFeatObj = {
      featureTitle: form.value.newFeatTitle,
      featureDescription: form.value.newFeatDescription
    };
    updateObj.projectFeature.push(newFeatObj)
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (data: any[]) => {
        console.log("success", data)
        this.updateCurrentProjects();
        this.showFeatForm = false;
      },
      (error) => console.log(error)
      );
  }


}
