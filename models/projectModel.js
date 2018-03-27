var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var projectSchema = mongoose.Schema({

        userId: String,
        projectTitle: String,
        projectDescription: String,
        projectTask: [{
          taskTitle: String,
          taskDescription: String,
          taskCompleted:  {
            type: Boolean,
            default: false
          },
          taskCompletedOn: Date
        }],
        projectFeature: [{
          featureTitle: String,
          featureDescription: String,
          featureCompleted: {
            type: Boolean,
            default: false
          },
          featureCompletedOn: Date,
          featureTask: [{
            featureTaskTitle: String,
            featureTaskDescription: String,
            featureTaskCompleted: {
              type: Boolean,
              default: false
            },
            featureTaskCompletedOn: Date
          }]
        }],
        projectStory: [{
          storyTitle: String,
          storyStep: [{
            storyInfo: String
          }]
        }],
        projectNotes: Array,
        projectCompletedOn: Date

});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Projects', projectSchema);
