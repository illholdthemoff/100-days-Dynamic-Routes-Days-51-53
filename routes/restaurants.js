const express = require("express");
const uuid = require("uuid"); //essentially imports the ability to make unique IDs


const resData = require("../util/restaurant-data");


const router = express.Router();

router.get("/restaurants", function (req, res) {
    //   const htmlFilePath = path.join(__dirname, "views", "restaurants.html"); //we are basically creating a path to the file here, using __dirname which gets the location of our project, then going into views, and then grabbing restaurants.html
    //   res.sendFile(htmlFilePath);
  
    // THE ABOVE is a way of doing it without a template engine.
  
    let order = req.query.order;
    let nextOrder = "desc";

if (order !== "asc" && order !== "desc") {
    order = "asc";
}

if (order === "desc") {
    nextOrder = "asc";
}

    const storedRestaurants = resData.getStoredRestaurants();
  
storedRestaurants.sort(function(resA, resB) {
    if (
        (order === "asc" && resA.name > resB.name) || 
        (order === "desc" && resB.name > resA.name)) {
       return 1;
    } 
    return -1;
});

    res.render("restaurants", {
      numberOfRestaurants: storedRestaurants.length,
      restaurants: storedRestaurants, nextOrder: nextOrder
    }); //renders a template (one of our ejs files in this case) IE parse a template file with help of a template engine (like ejs), then convert it to HTML which then is sent back to the browser. Remember, it is able to access things because we set "views" and the appropriate file path earlier in line 7. We don't need to type restaurants.ejs becuase it's already looking for ejs, so restaurants works.
    // INSIDE OF the second parameter there, it is to hold any placeholder data that needs to be changed dynamically later as keys
    //   THE THIRD PARAMETER is grabbing the storedRestaurant objects from the JSON file and rendering them
  });
  
  router.get("/restaurants/:id", function (req, res) {
    // /restaurants/r1 etc access
    const restaurantId = req.params.id; //the .id is of course because we chose 'restaurants/:id' if we picked something else that would change too.
  
    const storedRestaurants = resData.getStoredRestaurants();
  
    for (const restaurant of storedRestaurants) {
      if (restaurant.id === restaurantId) {
        return res.render("restaurant-detail", { restaurant: restaurant }); // grabs the restaurant if it matches our ID and then exits the loop, since we have what we need.
      }
    }
  
    res.status(404).render("404"); // rendering the 404 page, but also setting the status code to 404
  });
  
  
  
  router.get("/confirm", function (req, res) {
    //   const htmlFilePath = path.join(__dirname, "views", "confirm.html");
    //   res.sendFile(htmlFilePath);
    res.render("confirm");
  });
  
  router.get("/recommend", function (req, res) {
    //   const htmlFilePath = path.join(__dirname, "views", "recommend.html");
    //   res.sendFile(htmlFilePath);
    res.render("recommend");
  });
  
  router.post("/recommend", function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4(); //randomly generates an ID and appends it to the restaurant object. in JS if you do .whatever on an object that doesn't have that already it will just add it for you.
  
    const storedRestaurants = resData.getStoredRestaurants();
  
    // const filePath = path.join(__dirname, "data", "restaurants.json");
  
    // const fileData = fs.readFileSync(filePath);
    // const storedRestaurants = JSON.parse(fileData); // takes the shit from fileData and converts it from text into useable javascrip object
  
    storedRestaurants.push(restaurant);
  
    resData.storeRestaurants(storedRestaurants); // this does what the below code does, just trimmed
    // fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); //converts it back into text
  
    res.redirect("/confirm");
  });

  module.exports = router;