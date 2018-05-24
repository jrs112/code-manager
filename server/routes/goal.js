const express = require('express');
const router = express.Router();
const Goal = require("../../models/goalModel.js");

//Create A Project
router.post('/creategoal', function(req, res) {
  req.body.userId = req.user._id;
  var newGoal = new Goal(req.body);
  newGoal.save(function(err, goal) {
    if(err) {
        console.log('Error creating goal', err);
    } else {
        res.json(goal);
    }
  });
});







  module.exports = router;
