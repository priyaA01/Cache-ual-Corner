// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) 
{
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });
  //login route
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });
  //sign up route
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  })
  //update route
  app.get("/update", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/updateuser.html"))
  })

  //chat routes
   app.get("/chat", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/chat.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/chat.html"));
  });

  

};