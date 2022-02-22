const path = require("path");
const express = require("express");

const app = express(); //bascially using a variable instead of typing express().whatever every single time.

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

app.set("views", path.join(__dirname, "views")); //first parameter is telling ejs what we want it to grab from (views in this case is a reserved keyword), second paramaeter is its location ('views' in this case refers to the folder itself, NOT the keyword)
app.set("view engine", "ejs"); //tells app thgat we want to use a template engine to process view files. Second option is what engine youre using

app.use(express.static("public")); // basically middleware that lets us use static files too. Whenever it gets a request, it checks if the file is in the public folder. If it is, the file is then returned as a response. If not, it will forward to the other routes (/restaurants etc), and if not the request will fail
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes); //basically saying that any incoming request that begins with / gets handled by defaultRoutes. Initially this means
// that it will reach into default.js to find a matching address, and if not will then continue down this file to restaurantRoutes and then 404 etc
app.use("/", restaurantRoutes);


// app.get("/", function (req, res) {
//remember, when it gets the '/' (ie visiting the base webasite) it executes the second thing in the parameter, in this case the function
//   res.send("<h1>Hello World!</h1>");
// }); -- BASELINE CODE EXAMPPLE

 


app.use(function (req, res) {
  //placed at bottom of the page, so taht it catches any requests or whatever not grabbed by anything else
  res.status(404).render("404"); // just renders 404 page
});

app.use(function (error, req, res, next) {
  // this invokes the native error handler in expressJS. it absolutely REQUIRES 4 parameters, one of which being the error parameter.
  res.status(500).render("500"); // sets code to error 500 and also renders our error 500 page
});

app.listen(3000); // sets up server that listens to requests
