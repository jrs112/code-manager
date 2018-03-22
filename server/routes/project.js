const express = require('express');
const router = express.Router();
const Project = require("../../models/projectModel.js");

//Create A Project
router.post('/createproject', function(req, res) {
  console.log('Posting a New Project');
  console.log(req.body);
  var newProject = new Project(req.body);
  newProject.save(function(err, customer) {
      if(err) {
          console.log('Error creating project', err);
      } else {
          res.json(customer);
      }
  });
});


  module.exports = router;
