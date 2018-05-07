import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from "../services/project-api.service";

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.scss']
})
export class SessionViewComponent implements OnInit {

  constructor(private projectApiService: ProjectApiService) { }

  taskSearchInput = "";
  selectedTaskArr = [];
  incompleteTaskArr = [];
  taskSearchResultsArr = [];
  taskProjectMatchArr = [];
  taskTitleMatchArr = [];

  ngOnInit() {
  }



  searchFocus() {
    console.log("we have focus");
    this.setSearchArr();
  }

  cancelSearch() {
    this.taskSearchResultsArr = [];
    this.taskSearchInput = "";
  }

  setSearchArr() {
    console.log("runnning set search");
    if(this.incompleteTaskArr.length == 0) {
      this.projectApiService.getUserProjects()
      .subscribe(
        (data: any[]) => {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].projectTask.length; j++) {
              if (!data[i].projectTask[j].taskCompleted) {
                var projTaskObj = {
                  projectId: data[i]._id,
                  taskId: data[i].projectTask[j]._id,
                  projectTitle: data[i].projectTitle,
                  taskTitle: data[i].projectTask[j].taskTitle,
                  taskDescription: data[i].projectTask[j].taskDescription
                };
                this.incompleteTaskArr.push(projTaskObj);
              }
            }
            for (var k = 0; k < data[i].projectFeature.length; k++) {
              for (var m = 0; m < data[i].projectFeature[k].featureTask.length; m++) {
                var featureTask = data[i].projectFeature[k].featureTask[m];
                if (!featureTask.featureTaskCompleted) {
                  var featureTaskObj = {
                    projectId: data[i]._id,
                    taskId: featureTask._id,
                    projectTitle: data[i].projectTitle,
                    taskTitle: featureTask.featureTaskTitle,
                    taskDescription: featureTask.featureTaskDescription
                  };
                  this.incompleteTaskArr.push(featureTaskObj);
                }
              }
            }
          }
        },
        (err) => {
          console.log( "error: ", err);
        }
      )
    }
    this.taskSearchResultsArr = this.incompleteTaskArr;
  }

  addTask(task) {
    console.log("getting to this function")
    //function for selecting tags to add or remove them to the selected interest array
  for (var i = 0; i < this.selectedTaskArr.length; i++) {
    if (task == this.selectedTaskArr[i]) {
      var newSelectArray = this.selectedTaskArr.filter((index) => index != task);
      this.selectedTaskArr = newSelectArray;
      return;
    }
  }
  this.selectedTaskArr.push(task);
  this.setSearchArr();
  }

  //function being ran during each event like a keystrok in the search input field.
onInput(event) {
  console.log("Got Input", event);
  let val = event.target.value;
  console.log(val);
  //if statement is to prevent the array being rest when we are doing a cancel event.
  if (this.taskSearchInput == '' || val != undefined) {
  this.setSearchArr();
}
  //checks to remove tags that do not match the string entered in the search input.
  if (val && val.trim() !== '') {
    this.taskProjectMatchArr = this.taskSearchResultsArr.filter(function(item) {
      return item.projectTitle.toLowerCase().includes(val.toLowerCase());
    });
    this.taskTitleMatchArr = this.taskSearchResultsArr.filter(function(item) {
      return item.taskTitle.toLowerCase().includes(val.toLowerCase());
    });
    var newResultsArray = this.taskProjectMatchArr.concat(this.taskTitleMatchArr);
    this.taskSearchResultsArr = newResultsArray.filter((elem, index, self) => {
          return index == self.indexOf(elem);
    });
  }
}

}
