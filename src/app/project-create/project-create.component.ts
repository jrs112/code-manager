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
  projectTaskCount = 0;
  projectFeatureCount = 0;
  featureTaskCount = 0;
  userInfo;

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

  addFeatureTask(index) {
    this.featureTaskCount++;
    var featureTaskObj = {
      featureTaskTitle: "featureTaskTitle" + this.featureTaskCount,
      featureTaskDescription: "featureTaskDescription" + this.featureTaskCount
    }
    this.projectFeatureArr[index].featureTask.push(featureTaskObj);
  }

  removeTask(index) {
    this.projectTaskArr.splice(index, 1);
  }

  removeFeature(index) {
    this.projectFeatureArr.splice(index, 1);
  }

  removeFeatureTask(featureIndex, taskIndex) {
    this.projectFeatureArr[featureIndex].featureTask.splice(taskIndex, 1);
  }

  createProject(project, feature) {

    var projectInfo = project.value;
    var featureInfo = feature.value;

    //Set variable for project task info
    var projectTaskInfo = [];
    var projectFeatureInfo = [];


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

    console.log(this.userInfo._id);



    var projectObj = {
      userId: this.userInfo._id,
      projectTitle: projectInfo.projectTitle,
      projectDescription: projectInfo.projectDescription,
      projectTask: projectTaskInfo,
      projectFeature: projectFeatureInfo
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
