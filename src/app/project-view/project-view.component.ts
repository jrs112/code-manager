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
  moveOrderArr = [];
  showProjTaskForm = false;
  showFeatForm = false;
  showStoryForm = false;
  showStory = false;
  showUpdate = false;
  showAdd = false;
  showDeleteProj = false;
  defaultStepOrder = 1;

  ngOnInit() {
    this.getAllProjects();

  }

  updateDisplay(updateBool: boolean, addBool: boolean) {
    this.showUpdate = updateBool;
    this.showAdd = addBool;
  }

  showFeatureForm() {
    this.showFeatForm = true;
    this.showStoryForm = false;
  }

  showStoryFrm() {
    this.showFeatForm = false;
    this.showStoryForm = true;
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
    this.showAdd = false;
    this.currentProjects.push(selectedProject);
    console.log(this.currentProjects);
    for (var i = 0; i < this.currentProjects.length; i++) {
      for (var j = 0; j < this.currentProjects[i].projectFeature.length; j++) {
        this.currentProjects[i].projectFeature[j].addTask = false;
        this.currentProjects[i].projectFeature[j].showDelete = false;
      }
      for (var k = 0; k < this.currentProjects[i].projectStory.length; k++) {
        this.currentProjects[i].projectStory[k].showDelete = false;
        this.currentProjects[i].projectStory[k].showAddStep = false;
      }
    }
  }

  updateCurrentProjects(selectedProject) {
          this.currentProjects = [];
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
    if ((titleForm.value.newProjTitle == '' || titleForm.value.newProjTitle == null) && (titleForm.value.newProjDescription == '' || titleForm.value.newProjDescription == null)) {
      console.log('nothing');
      return;
    } else {
      if(titleForm.value.newProjTitle != '' && titleForm.value.newProjTitle != null) {
        updateObj.projectTitle = titleForm.value.newProjTitle
      }
      if(titleForm.value.newProjDescription != '' && titleForm.value.newProjDescription != null) {
        updateObj.projectDescription = titleForm.value.newProjDescription;
      }
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
    if ((newTaskObj.featureTaskTitle == '' || newTaskObj.featureTaskTitle == null) && (newTaskObj.featureTaskDescription == '' || newTaskObj.featureTaskDescription == null)) {
      console.log('nothing');
      return;
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
    if ((newTaskObj.taskTitle == '' || newTaskObj.taskTitle == null) && (newTaskObj.taskDescription == '' || newTaskObj.taskDescription == null)) {
      console.log('nothing');
      return;
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
    if ((newFeatObj.featureTitle == '' || newFeatObj.featureTitle == null) && (newFeatObj.featureDescription == '' || newFeatObj.featureDescription == null)) {
      console.log('nothing');
      return;
    }
    updateObj.projectFeature.push(newFeatObj);
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

  addProjStory(projectIndex, form) {
    var updateObj = this.currentProjects[projectIndex];
    var newStoryObj = {
      storyTitle: form.value.newStoryTitle
    };
    if (newStoryObj.storyTitle == '' || newStoryObj.storyTitle == null) {
      console.log('nothing');
      return;
    }
    updateObj.projectStory.push(newStoryObj);
    this.projectApiService.updateProject(updateObj._id, updateObj)
    .subscribe(
      (data: any[]) => {
        console.log("success", data)
        this.updateCurrentProjects(data);
        this.getAllProjects();
        this.showStoryForm = false;
      },
      (error) => console.log(error)
      );
  }

  addStoryStep(story) {
    console.log("story test", story);
    this.defaultStepOrder = 1;
    if(story.storyStep.length > 0) {
      var lastCount = story.storyStep[story.storyStep.length -1];
      console.log("last count", lastCount);
      this.defaultStepOrder = lastCount.order + 1;
    }
    story.showAddStep = true;
  }

  submitStoryStep(project, story, form) {
    this.moveOrderArr = [];
    var newStep = {
      storyInfo: form.value.newStoryStep,
      order: form.value.newStoryOrder
    }
    if(newStep.order < 1) {
      newStep.order = 1;
    }
    if (newStep.storyInfo == '' || newStep.storyInfo == null) {
      console.log('nothing');
      return;
    }
    if (story.storyStep.length > 0 && newStep.order > story.storyStep[story.storyStep.length - 1].order) {
      newStep.order = story.storyStep[story.storyStep.length -1].order + 1;
      story.storyStep.push(newStep);
    } else {
      this.moveOrderArr.push(newStep);
      this.moveUpOrder(story.storyStep, newStep);
      }
      this.projectApiService.updateProject(project._id, project)
      .subscribe (
        (data: any[]) => {
          this.getAllProjects();
          story.showAddStep = false;
        }
      )
  }

  moveUpOrder(arr, obj) {
    var gotDup = false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].order == obj.order) {
          arr[i].order = arr[i].order + 1;
          var newValue = arr[i];
          this.moveOrderArr.push(arr[i]);
          arr.splice(i, 1);
          gotDup = true;
          this.moveUpOrder(arr, newValue);
          break;
        }
    }
    if(!gotDup) {
      for (var j = 0; j < this.moveOrderArr.length; j++) {
        arr.push(this.moveOrderArr[j]);
      }
      arr.sort(function(a, b) {
        return a.order - b.order
      });
    }
  }

  deleteStoryStep(project, story, storyStep, projectIndex, storyIndex, stepIndex) {
    story.storyStep.splice(stepIndex, 1);
    this.moveDownOrder(story.storyStep, stepIndex);
    console.log(story.storyStep);
    this.projectApiService.updateProject(project._id, project)
    .subscribe (
      (data: any[]) => {
        this.getAllProjects();
      }
    )

  }

  moveDownOrder(arr, startIndex) {
    console.log(startIndex);
    for (var i = startIndex; i < arr.length; i++) {
      arr[i].order--;
    }
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
      _id: project._id,
      featureId: feature._id
    }
    console.log("delete obj:, ", deleteFeatureObj);
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
    if ((feature.value.upFeatureTitle == '' || feature.value.upFeatureTitle == null) && (feature.value.upFeatureDescription == '' || feature.value.upFeatureDescription == null)) {
      console.log('nothing');
      return;
    } else {
      if (feature.value.upFeatureTitle != '' && feature.value.upFeatureTitle != null){
        project.projectFeature[featureIndex].featureTitle = feature.value.upFeatureTitle;
      }
      if (feature.value.upFeatureDescription != '' && feature.value.upFeatureDescription != null){
        project.projectFeature[featureIndex].featureDescription = feature.value.upFeatureDescription;
      }
    }

    this.projectApiService.updateProject(project._id, project)
    .subscribe(
      (info: any[]) => {
        this.updateCurrentProjects(info);
      },
    (err) => console.log("error", err)
    )
  }

  deleteStory(project, story, projectIndex, storyIndex) {
    var featureUpdateObj = {
      _id: project._id,
      storyId: story._id
    }
    this.projectApiService.deleteStory(featureUpdateObj)
    .subscribe(
      (deleteInfo: any[]) => {
        console.log(deleteInfo);
        this.getAllProjects();
        this.currentProjects[projectIndex].projectStory.splice(storyIndex, 1);
      },
      (err) => console.log("error", err)
    )
  }


}
