const express = require('express');
const router = express.Router();
const User = require("../../models/userModel.js");
const passport = require("passport");

// process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/landingpage', // redirect to the secure profile section
        failureRedirect : '/usersignup', // redirect back to the signup page if there is an error
    }));

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/landingpage', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error

    }));

    //log out customer
    router.get("/logout", function(req, res) {
        req.logout();
        req.session.destroy(function(err) {
            res.redirect('/');

        });
    });

    //Get logged in user info
    router.get("/userinfo", function(req, res) {
      if(req.user) {
        res.json(req.user);
      } else {
        var errorMessage = {
          errorMessage: "No user logged in"
        };
        res.json(errorMessage);
      }
      });

      // check to see if there are any users in DB
      router.get("/allusers", function(req, res) {
        console.log("Got here");
        User.find().exec(function(error, users) {
          // Log any errors
          if (error) {
            console.log(error);
          }

          else {
            retObj = {};
            console.log("Length ", users.length);
            if (users.length === 0) {
              retObj = {
                successMsg: "yes"
              };
            } else {
              retObj = {
                failureMsg: "no"
              };
            }
          res.json(retObj);
          }
        });
      });

      // This will get all user names in db
      router.get("/allemployees", function(req, res) {
        console.log("Got here");
        User.find().exec(function(error, users) {
          // Log any errors
          if (error) {
            console.log(error);
            res.json(error);
          } else {
            var employeeArr = [];
            for (var i = 0; i < users.length; i++) {
              var employeeObj = {
                employeeName: users[i].local.first_name + " " + users[i].local.last_name
              };
              employeeArr.push(employeeObj);
            }
            res.json(employeeArr);
          }
        });
      });



      //Customer Portal Routes

      //Create customer user account
      router.post('/signupcustomer', passport.authenticate('customer-local-signup', {
          successRedirect : '/customerportal', // redirect to the secure profile section
          failureRedirect : '/customerlanding', // redirect back to the signup page if there is an error
          failureFlash: true
      }));

      router.post('/logincustomer', passport.authenticate('customer-local-login', {
          successRedirect : '/customerportal', // redirect to the secure profile section
          failureRedirect : '/customerlanding', // redirect back to the signup page if there is an error
          failureFlash: true

      }));

module.exports = router;
