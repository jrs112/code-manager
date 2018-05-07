var mongoose = require('mongoose');


// define the schema for our user model
var sessionSchema = mongoose.Schema({
      sessionStarted: Date,
      sessionEnded: Date,
      sessionLength: String,
      sessionTaskArr[{
        projectId: {
          type: String,
          default: "none"
        },
        featureId: {
          type: String,
          default: "none"
        },
        taskId: {
          type: String,
          default: "none"
        },
        projectTitle: {
          type: String
          default: "none"
        },
        featureTitle: {
          type: String,
          default: "none"
        }
        taskTitle: {
          type: String
        },
        taskDescription: String,
        complete: {
          type: Boolean,
          default: false
        }
      }]

});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Sessions', sessionSchema);
