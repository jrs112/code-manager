const express = require('express');
const router = express.Router();
const Project = require("../../models/projectModel.js");

//Create A Project
router.post('/createproject', function(req, res) {
  var newProject = new Project(req.body);
  newProject.save(function(err, customer) {
      if(err) {
          console.log('Error creating project', err);
      } else {
          res.json(customer);
      }
  });
});

//all user projects
router.get("/alluserprojects", function(req, res) {
  console.log("Got here");
  Project.find({"userId": req.user._id}).exec(function(error, orders) {
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

//Update project
    router.put("/updateproject/:id", function(req, res) {
      var info = req.body;
      console.log("here is the info");
      console.log(info);
      console.log(req.params.id);
      Project.findByIdAndUpdate(req.params.id, {$set: info}, {new: true}, function(err, order) {
        if (err) return handleError(err);
        res.send(order);
      });
    });

    //Add Task to Feature
    router.put("/addserviceorderservice/:id", function(req, res) {
      var info = req.body;
      console.log("here is the info");
      console.log(info);
      Project.findByIdAndUpdate(req.params.id, {$push: info}, function(err, order) {
        if (err) return handleError(err);
        console.log("sending back order");
        res.send(order);
      });
    });

    router.post("/deleteproject", function(req, res) {
      var info = req.body;
      console.log("test", req.body._id);
      Project.find({_id: req.body._id}).remove(function(err, rem) {
        if(err) {
          console.log("error occured: ", err);
          return;
        } else {
          console.log("deleted")
          res.json(rem);
        }
      });
    });

    // Remove project feature
router.put("/removeprojectfeature", function(req, res) {
    Project.update({"_id": req.body._id}, {"$pull": {"projectFeature": {_id: req.body.featureId}}},function(err, data) {
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
});

    // Remove project task
router.put("/removeprojecttask", function(req, res) {
    Project.update({"_id": req.body._id}, {"$pull": {"projectTask": {_id: req.body.taskId}}},function(err, data) {
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
});

router.put("/removefeaturetask", function(req, res) {
    Project.update({"_id": req.body._id, "projectFeature._id": {"$eq": req.body.featureId}}, {"$pull": {"projectFeature.$.featureTask": {_id: req.body.taskId}}},function(err, data) {
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
});

// Remove project story
router.put("/removeprojectstory", function(req, res) {
Project.update({"_id": req.body._id}, {"$pull": {"projectStory": {_id: req.body.storyId}}},function(err, data) {
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
});





  module.exports = router;
