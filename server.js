// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Creating express app and Requiring passport as we've configured it
var passport = require("./config/passport");
var app = express();
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");
//Requiring http, socket.io for messaging
var server = require('http').Server(app);
var io = require('socket.io')(server);

// configuring middleware needed for authentication
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/login-api-routes.js")(app);
require("./routes/chat-api-routes.js")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({
  // force: true
}).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

  });
});

// socket connection and disconnect 
// =============================================================
io.on('connection', function (socket) {
  console.log('user connected ' + socket.id);

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected   ' + socket.id);
  });

});
