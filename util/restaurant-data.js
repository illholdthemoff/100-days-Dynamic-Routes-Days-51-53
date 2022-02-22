const filePath = path.join(__dirname, "data", "restaurants.json"); // moved out of the function so that other functions in the file have access

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  return storedRestaurants; //returned so that any function that calls this function will also have access to storedRestaurants
}

function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}
