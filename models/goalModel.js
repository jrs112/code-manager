var mongoose = require('mongoose');

// define the schema for our user model
var goalSchema = mongoose.Schema({

        userId: String,
        goalTitle: String,
        goalTask: [{
          taskTitle: String,
          taskDescription: String,
          taskCompleted:  {
            type: Boolean,
            default: false
          },
          taskCompletedOn: Date
        }],
        goalNotes: Array,
        goalCompletedOn: Date

});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Goals', goalSchema);
