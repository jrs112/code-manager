import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../services/user-api.service";
import { ProjectApiService } from "../services/project-api.service";
import { CanDeactivateGuard } from "../services/can-deactivate-guard.service";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  projectTaskArr = [];
  projectFeatureArr = [];
  projectStoryArr = [];
  projectTaskCount = 0;
  projectFeatureCount = 0;
  featureTaskCount = 0;
  projectStoryCount = 0;
  storyStepCount = 0;
  userInfo;
  showStory = false;
  featureSaveErrMsg = "";
  storySaveErrMsg = "";
  projTitleSaveErrMsg = "";
  showProjCreateMsg = false;
  projectTitle = "";

  constructor(private userApiService: UserApiService, private projectApiService: ProjectApiService) { }

  ngOnInit() {
    this.userApiService.userInfo()
      .subscribe(
        (userInfo: any) => {
          this.userInfo = userInfo;
          console.log(this.userInfo);
        },
        (error) => console.log(error)
        );
  }

  canDeactivate() {
    console.log('i am navigating away');
  //if the project title is not blank
    if (this.projectTitle != '' && this.projectTitle != null) {
      var response = confirm("Are you sure you want to leave without saving your project?");
      return response;
    }

    return true;
}



  addProjTask() {
    this.projectTaskCount++
    var taskObj = {
      taskTitle: "taskTitle" + this.projectTaskCount,
      taskDescription: "taskDescription" + this.projectTaskCount
    };
    this.projectTaskArr.push(taskObj);
  }

  addProjFeature() {
    this.projectFeatureCount++;
    var featureObj = {
      featureTitle: "featureTitle" + this.projectFeatureCount,
      featureDescription: "featureDescription" + this.projectFeatureCount,
      featureTask: []
    }
    this.projectFeatureArr.push(featureObj);
  }

  addProjStory() {
    this.projectStoryCount++;
    var storyObj = {
      storyTitle: "storyTitle" + this.projectStoryCount,
      storyStep: []
    }
    this.projectStoryArr.push(storyObj);
  }

  addFeatureTask(index) {
    this.featureTaskCount++;
    var featureTaskObj = {
      featureTaskTitle: "featureTaskTitle" + this.featureTaskCount,
      featureTaskDescription: "featureTaskDescription" + this.featureTaskCount
    }
    this.projectFeatureArr[index].featureTask.push(featureTaskObj);
  }

  addStoryStep(index) {
    this.storyStepCount++;
    var newCount = 1;
    if (this.projectStoryArr[index].storyStep.length > 0) {
      var finalCount = this.projectStoryArr[index].storyStep[this.projectStoryArr[index].storyStep.length - 1];
      newCount = finalCount.defaultStepOrder + 1
    }

    console.log(newCount);

    var storyStepObj = {
      storyInfo: "storyInfo" + this.storyStepCount,
      stepOrderName: "stepOrder" + this.storyStepCount,
      defaultStepOrder: newCount
    }

    this.projectStoryArr[index].storyStep.push(storyStepObj);
  }


  removeTask(index) {
    this.projectTaskArr.splice(index, 1);
  }

  removeFeature(index) {
    this.projectFeatureArr.splice(index, 1);
  }
  removeStory(index) {
    this.projectStoryArr.splice(index, 1);
  }

  removeFeatureTask(featureIndex, taskIndex) {
    this.projectFeatureArr[featureIndex].featureTask.splice(taskIndex, 1);
  }
  removeStoryStep(storyIndex, stepIndex) {
    this.projectStoryArr[storyIndex].storyStep.splice(stepIndex, 1);
  }

  createProject(project, feature, story) {
    this.showProjCreateMsg = false;
    this.featureSaveErrMsg = "";
    this.storySaveErrMsg = "";
    this.projTitleSaveErrMsg = "";

    var projectInfo = project.value;
    var featureInfo = feature.value;
    var storyInfo = story.value;

    if (projectInfo.projectTitle == '' || projectInfo.projectTitle == null) {
      this.projTitleSaveErrMsg = "You must enter a project title to save the project";
      return;
    }

    //Set variable for project task info
    var projectTaskInfo = [];
    var projectFeatureInfo = [];
    var projectStoryInfo = [];


    for (var i = 0; i < this.projectTaskArr.length; i++) {
      var projectTaskTitle = this.projectTaskArr[i].taskTitle;
      var projectTaskDescription = this.projectTaskArr[i].taskDescription;
      var projectTaskInfoObj = {
        taskTitle: projectInfo[projectTaskTitle],
        taskDescription: projectInfo[projectTaskDescription]
      }
      if((projectTaskInfoObj.taskTitle == '' || projectTaskInfoObj.taskTitle == null) && (projectTaskInfoObj.taskDescription == '' || projectTaskInfoObj.taskDescription == null)) {
        console.log("nothing entered");
      } else {
      projectTaskInfo.push(projectTaskInfoObj);
      }
    }


    //Set Variable for project feature info
    for (var j = 0; j < this.projectFeatureArr.length; j++) {
      var featureTaskInfo = [];

      for (var k = 0; k < this.projectFeatureArr[j].featureTask.length; k++) {
        var featureTaskTitleInfo = this.projectFeatureArr[j].featureTask[k].featureTaskTitle;
        var featureTaskDescriptionInfo = this.projectFeatureArr[j].featureTask[k].featureTaskDescription;


        var featureTaskInfoObj = {
          featureTaskTitle: featureInfo[featureTaskTitleInfo],
          featureTaskDescription: featureInfo[featureTaskDescriptionInfo]
        }

        if((featureTaskInfoObj.featureTaskTitle == '' || featureTaskInfoObj.featureTaskTitle == null) && (featureTaskInfoObj.featureTaskDescription == '' || featureTaskInfoObj.featureTaskDescription == null)) {
          console.log("nothing entered");
        } else {
          featureTaskInfo.push(featureTaskInfoObj);
        }
      }
      var featureTitleInfo = this.projectFeatureArr[j].featureTitle;
      var featureDescriptionInfo = this.projectFeatureArr[j].featureDescription;

      var projectFeatureInfoObj = {
        featureTitle: featureInfo[featureTitleInfo],
        featureDescription: featureInfo[featureDescriptionInfo],
        featureTask: featureTaskInfo
      }
        if((projectFeatureInfoObj.featureTitle == '' || projectFeatureInfoObj.featureTitle == null) && (projectFeatureInfoObj.featureDescription == '' || projectFeatureInfoObj.featureDescription == null)) {
          if (projectFeatureInfoObj.featureTask.length > 0) {
            this.featureSaveErrMsg = "You have tasks assigned to a feature without a title.  Add a title to the feature to save the project.";
            return;
          }
        } else {
          projectFeatureInfo.push(projectFeatureInfoObj);
      }
    }

    //Set Variable for project story Info

    for(var m = 0; m < this.projectStoryArr.length; m++) {
      var storyStepInfo = [];

      for (var n = 0; n < this.projectStoryArr[m].storyStep.length; n++) {
        var storyStepInfoVar = this.projectStoryArr[m].storyStep[n].storyInfo;
        var storyOrderVar = this.projectStoryArr[m].storyStep[n].stepOrderName;
        var storyStepObj = {
          storyInfo: storyInfo[storyStepInfoVar],
          order: storyInfo[storyOrderVar]
        };
        console.log("storyObj", storyStepObj);
        if(storyStepObj.storyInfo == '' || storyStepObj.storyInfo == null) {
          console.log("Nothing Entered");
        } else {
          storyStepInfo.push(storyStepObj);
        }
      }
      var storyTitleInfo = this.projectStoryArr[m].storyTitle;

      console.log("storyStepInfo", storyStepInfo);
      storyStepInfo.sort(function(a, b) {
        return a.order - b.order
      });
      for (var p = 0; p < storyStepInfo.length; p++) {
        storyStepInfo[p].order = p + 1;
      }
      var projectStoryInfoObj = {
        storyTitle: storyInfo[storyTitleInfo],
        storyStep: storyStepInfo
      };
      if (projectStoryInfoObj.storyTitle == '' || projectStoryInfoObj.storyTitle == null) {
        if(projectStoryInfoObj.storyStep.length > 0) {
          this.storySaveErrMsg = "You have entered steps for a sequence that has no title.  Please enter a title for the sequence to save the project."
          return;
        }
      } else {
        projectStoryInfo.push(projectStoryInfoObj);
      }
    }

    console.log(this.userInfo._id);



    var projectObj = {
      userId: this.userInfo._id,
      projectTitle: projectInfo.projectTitle,
      projectDescription: projectInfo.projectDescription,
      projectTask: projectTaskInfo,
      projectFeature: projectFeatureInfo,
      projectStory: projectStoryInfo
    }

    this.projectApiService.createProject(projectObj)
    .subscribe(info => {
      console.log("project info", info);
      this.projectTaskArr = [];
      this.projectFeatureArr = [];
      this.projectStoryArr = [];
      this.projectTaskCount = 0;
      this.projectFeatureCount = 0;
      this.featureTaskCount = 0;
      this.projectStoryCount = 0;
      this.storyStepCount = 0;
      this.showStory = false;
      this.featureSaveErrMsg = "";
      this.storySaveErrMsg = "";
      this.projTitleSaveErrMsg = "";
      this.showProjCreateMsg = true;
      },
    (err) =>  {
      console.log("error: ", err)
    }
    );


  }

}
