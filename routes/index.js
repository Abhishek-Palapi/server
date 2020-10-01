const { Router } = require("express");
const controllers = require("../controllers");
var bodyParser = require("body-parser");
// const data = require('./data/data.json')
const fs = require("fs");

const router = Router();

// create application/json parser
var jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  let jsonData = JSON.parse(fs.readFileSync("./data/items.json", "utf-8"));
  res.send(jsonData);
});

router.post("/food/addFoodItem", jsonParser, controllers.addFood);
router.post("/food/deleteItems", jsonParser, controllers.deleteFoodItem);
router.post("/food/updateFoodItem", jsonParser, controllers.updateFoodItem)

module.exports = router;
