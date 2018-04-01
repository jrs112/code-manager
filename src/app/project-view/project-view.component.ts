import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from "../services/project-api.service";

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  constructor(private projectApiService: ProjectApiService) { }
  allProjects = [];
  currentProjects = [];
  showProjTaskForm = false;
  showFeatForm = false;
  showStory = false;
  showUpdate = false;
  showDeleteProj = false;

  ngOnInit() {
    this.getAllProjects();

  }


  getAllProjects() {
    this.projectApiService.getUserProjects()
      .subscribe(
        (order: any[]) => {
          this.allProjects = order;
          console.log("test", this.allProjects);
        },
        (error) => console.log(error)
        );
  }


  selectCurrentProject(selectedProject) {
    this.currentProjects = [];
    this.showStory = false;
    this.showUpdate = false;
    this.currentProjects.push(selectedProject);
    console.log(this.currentProjects);
    for (var i = 0; i < this.currentProjects.length; i++) {
      for (var j = 0; j < this.currentProjects[i].projectFeature.length; j++) {
        this.currentProjects[i].projectFeature[j].addTask = false;
        this.currentProjects[i].projectFeature[j].showDelete = false;
      }
    }
  }

  updateCurrentProjects(selectedProject) {
          this.currentProjects = [];
          this.showStory = false;
          this.currentProjects.push(selectedProject);
          console.log(this.currentProjects);
          for (var i = 0; i < this.currentProjects.length; i++) {
            for (var j = 0; j < this.currentProjects[i].projectFeature.length; j++) {
              this.currentProjects[i].projectFeature[j].addTask = false;
            }
          }
          this.getAllProjects();

  }

  isActive(project) {
    for (var i = 0; i < this.currentProjects.length; i++) {
      if (project._id == this.currentProjects[i]._id) {
        return true;
      }
    }
      return false;
  };

  updateProjTask(projIndex, taskIndex, bool) {
    var updateObj = this.currentProjects[projIndex];
    updateObj.projectTask[taskIndex].taskCompleted = bool;
    console.log(updateObj);
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (res: any[]) => {
        console.log("success", res)
        this.updateCurrentProjects(res);
      },
      (error) => console.log(error)
      );
  }

  updateProjTitle(projIndex, titleForm) {
    var updateObj = this.currentProjects[projIndex];
    if(titleForm.value.newProjTitle != '' && titleForm.value.newProjTitle != null) {
      updateObj.projectTitle = titleForm.value.newProjTitle
    }
    if(titleForm.value.newProjDescription != '' && titleForm.value.newProjDescription != null) {
      updateObj.projectDescription = titleForm.value.newProjDescription;
    }
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (res: any[]) => {
        console.log("success", res)
        this.updateCurrentProjects(res);
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
        this.updateCurrentProjects(data);
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
        this.updateCurrentProjects(data);
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
        this.updateCurrentProjects(data);
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
        this.updateCurrentProjects(data);
        this.showFeatForm = false;
      },
      (error) => console.log(error)
      );
  }

  deleteProject(project) {
    var deleteInfo = {
      _id: project._id
    };
    this.projectApiService.deleteProject(deleteInfo)
    .subscribe(
      (data: any[]) => {
        console.log("success", data);
        this.getAllProjects();
        this.currentProjects = [];
      }
    )
  }

  deleteProjTask(project, task, projectIndex, taskIndex) {
    console.log("project", project);
    console.log("task", task);
    var taskUpdateObj = {
      _id: project._id,
      taskId: task._id
    }
    this.projectApiService.deleteProjectTask(taskUpdateObj)
    .subscribe(
      (deleteInfo: any[]) => {
        console.log(deleteInfo);
        this.getAllProjects();
        this.currentProjects[projectIndex].projectTask.splice(taskIndex, 1);
      },
      (err) => console.log("error", err)
    )
  }

  deleteFeature(project, feature, projectIndex, featureIndex) {
    var deleteFeatureObj = {
      id: project._id,
      featureId: feature._id
    }
    this.projectApiService.deleteFeature(deleteFeatureObj)
    .subscribe(
      (deleteInfo: any[]) => {
        this.getAllProjects();
        this.currentProjects[projectIndex].projectFeature.splice(featureIndex, 1);
      }
    )

  }

  deleteFeatureTask(project, feature, task, projectIndex, featureIndex, taskIndex) {
    console.log("project", project);
    console.log("feature", feature);
    console.log("task", task);
    var taskUpdateObj = {
      _id: project._id,
      featureId: feature._id,
      taskId: task._id
    }
    this.projectApiService.deleteFeatureTask(taskUpdateObj)
    .subscribe(
      (deleteInfo: any[]) => {
        console.log(deleteInfo);
        this.getAllProjects();
        this.currentProjects[projectIndex].projectFeature[featureIndex].featureTask.splice(taskIndex, 1);

      },
      (err) => console.log("error", err)
    )
  }

  updateFeature(projectIndex, featureIndex, feature) {
    var project = this.currentProjects[projectIndex];
    project.projectFeature[featureIndex].featureTitle = feature.value.upFeatureTitle;
    project.projectFeature[featureIndex].featureDescription = feature.value.upFeatureDescription;
    this.projectApiService.updateProject(project._id, project)
    .subscribe(
      (info: any[]) => {
        this.updateCurrentProjects(info);
      },
    (err) => console.log("error", err)
    )
  }


}
