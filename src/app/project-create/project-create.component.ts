import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../services/user-api.service";
import { ProjectApiService } from "../services/project-api.service";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  errorMessage = "";
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

    var projectInfo = project.value;
    var featureInfo = feature.value;
    var storyInfo = story.value;

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
      projectTaskInfo.push(projectTaskInfoObj);
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

        featureTaskInfo.push(featureTaskInfoObj);
      }
      var featureTitleInfo = this.projectFeatureArr[j].featureTitle;
      var featureDescriptionInfo = this.projectFeatureArr[j].featureDescription;

      var projectFeatureInfoObj = {
        featureTitle: featureInfo[featureTitleInfo],
        featureDescription: featureInfo[featureDescriptionInfo],
        featureTask: featureTaskInfo
      }
      projectFeatureInfo.push(projectFeatureInfoObj);
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

        storyStepInfo.push(storyStepObj);
      }
      var storyTitleInfo = this.projectStoryArr[m].storyTitle;

      console.log("storyStepInfo", storyStepInfo);
      storyStepInfo.sort(function(a, b) {
        return a.order - b.order
      });
      var projectStoryInfoObj = {
        storyTitle: storyInfo[storyTitleInfo],
        storyStep: storyStepInfo
      };

      projectStoryInfo.push(projectStoryInfoObj);

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

      },
    (err) =>  {
      console.log("error: ", err)
    }
    );


  }

}
