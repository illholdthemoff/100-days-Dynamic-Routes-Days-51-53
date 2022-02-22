const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..",  "data", "restaurants.json"); // moved out of the function so that other functions in the file have 
// access. the .. is so that the path goes up a level, as the data folder is not within the util folder that this file is in 

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants; //returned so that any function that calls this function will also have access to storedRestaurants
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}


module.exports = { // exporting the file
  getStoredRestaurants: getStoredRestaurants,
  storedRestaurants: storeRestaurants // right is the thing itself, left is the name you choose to refer to the thing,
//    therefore left can be 
//   changed willy nilly but if you change right you must change it in the above code too
 }