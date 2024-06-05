// Including the dependencies
require("dotenv").config(); // Add this line to use environment variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Setting view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection setup
const dbURI = process.env.MONGODB_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("Connection error", err.message);
  });

// Schema setup
const facultyRegSchema = new mongoose.Schema({
  name: String,
  pass: String,
});

const Faculty = mongoose.model("Faculty", facultyRegSchema);

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: Number,
  attendance: Number,
});

const Student = mongoose.model("Student", studentSchema);

Student.create(
  {
    name: "Abhishek",
    rollNo: 601,
    attendance: 1,
  },
  function (err, student) {
    if (err) {
      console.log(err);
    } else {
      console.log("Newly Created Student");
      console.log(student);
    }
  }
);

// Routing
// INDEX PAGE
app.get("/landing", function (req, res, next) {
  res.render("landing");
});

// Login page/register
app.get("/login", function (req, res, next) {
  res.render("login.ejs");
});

// Storing user data from registration page
app.post("/home", function (req, res, next) {
  const regname = req.body.regname;
  const regpass = req.body.regpass;
  const credentials = { name: regname, pass: regpass };
  Faculty.create(credentials, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // Direct to home page which is to be constructed
      res.redirect("/home");
    }
  });
});

app.get("/home", function (req, res, next) {
  res.render("home");
});

app.get("/login/home", function (req, res, next) {
  res.render("login/home");
});

// Attendance marking
app.get("/attendance", function (req, res, next) {
  res.render("attendance");
});

// Post method to add data to db
app.post("/faculty", function (req, res, next) {
  const name = req.body.name;
  const department = req.body.department;
  const newFaculty = { name: name, department: department };
  Faculty.create(newFaculty, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // Redirect to faculty page
      res.redirect("/faculty");
    }
  });
});

// Form for adding faculty
app.get("/faculty/newFaculty", function (req, res, next) {
  res.render("newFaculty.ejs");
});

// Adding route to view specific faculty
app.get("/faculty/:id", function (req, res, next) {
  res.send("Show specific faculty");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started");
});

// Faculty.create(
// {
// 	name: "Yogita",
// 	department: "IT"
// }, function(err, Faculty){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("Newly created faculty");
// 		console.log(Faculty);
// 	}
// }
// );

// var faculty = [
// 		{name: "Govind" , department: "IT"},
// 		{name: "Dalgade", department: "CS"}
// 	];

//landing on faculty form
// app.get("/faculty", function(req, res, next){
// 	Faculty.find({},function(err, allFaculty){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			res.render("faculty",{faculty:allFaculty});
// 		}
// 	});
// });

//facReg.create({
// 	name: "Yogita",
// 	pass: "rgit123"
// }, function(err, facReg){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("newlyCreated faculty");
// 		console.log(facReg);
// 	}
// }
// );
