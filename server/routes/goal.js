const express = require('express');
const router = express.Router();
const Goal = require("../../models/goalModel.js");

//Create A Goal
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

//all user goals
router.get("/allusergoals", function(req, res) {
  console.log("Got here");
  Goal.find({"userId": req.user._id}).exec(function(error, orders) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the orders to the browser as a json object
    else {
      res.json(orders);
    }
  });
});







  module.exports = router;
