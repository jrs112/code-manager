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
    else {
      res.json(orders);
    }
  });
});

//Delete Goal

router.post("/deletegoal", function(req, res) {
  var info = req.body;
  console.log("test", req.body._id);
  Goal.find({_id: req.body._id}).remove(function(err, rem) {
    if(err) {
      console.log("error occured: ", err);
      return;
    } else {
      console.log("deleted")
      res.json(rem);
    }
  });
});

//Update Goal
    router.put("/updategoal/:id", function(req, res) {
      var info = req.body;
      console.log("here is the info");
      console.log(info);
      console.log(req.params.id);
      Goal.findByIdAndUpdate(req.params.id, {$set: info}, {new: true}, function(err, order) {
        if (err) {
          console.log(err)
        }
        res.send(order);
      });
    })

    // Remove goal task
router.put("/removegoaltask", function(req, res) {
    Goal.update({"_id": req.body._id}, {"$pull": {"goalTask": {_id: req.body.taskId}}},function(err, data) {
      if(err) {
        console.log(err);
        res.send(err);
        return;
      }
      var successObj = {
        "msg": "deleted"
      };
      res.json(successObj);
    });
});;







  module.exports = router;
