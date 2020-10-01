// const models = require("../database/models");
const fs = require("fs");
var Ajv = require("ajv");

var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
// add food item to the json
const addFood = async (req, res) => {
  const schema = {
    definitions: {},
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://example.com/object1601555907.json",
    title: "Root",
    type: "object",
    required: ["foodLabel", "label", "price"],
    properties: {
      foodLabel: {
        $id: "#root/foodLabel",
        title: "Foodlabel",
        type: "string",
        default: "",
        examples: ["Rice"],
        pattern: "^.*$",
      },
      label: {
        $id: "#root/label",
        title: "Label",
        type: "string",
        default: "",
        examples: ["aaa"],
        pattern: "^.*$",
      },
      price: {
        $id: "#root/price",
        title: "Price",
        type: "integer",
        examples: [123],
        default: 0,
      },
    },
  };
  try {
    let jsonData = JSON.parse(fs.readFileSync("./data/items.json", "utf-8"));

    const data = req.body;

    data.price = parseInt(data.price);

    var validate = ajv.compile(schema);
    var valid = validate(data);
    console.log("vauld", valid, data);
    if (valid) {

      const newFoodItem = { label: req.body.label, price: req.body.price };

      jsonData.items.forEach((item) => {
        if (item.label === "food") {
          item.items.map((foodItem) => {
            if (foodItem.label === data.foodLabel) {
              foodItem.items.push(newFoodItem);
            }
          });
        }
      });
  
      fs.writeFile(
        "./data/items.json",
        JSON.stringify(jsonData),
        "utf8",
        (err) => {
          // Checking for errors
          if (err) throw err;
  
          res.status(jsonData);
        }
      );
    }

  } catch (err) {
    console.log("error", err);
  }
};
// delete food item to the json
const deleteFoodItem = async (req, res) => {
  try {
    let jsonData = JSON.parse(fs.readFileSync("./data/items.json", "utf-8"));
    const data = req.body;
    jsonData.items.forEach((item) => {
      if (item.label === "food") {
        item.items.map((foodItem) => {
          if (foodItem.label === data.foodLabel) {
            foodItem.items = foodItem.items.filter(
              (item) => item !== req.body.label
            );
          }
        });
      }
    });

    fs.writeFile(
      "./data/items.json",
      JSON.stringify(jsonData),
      "utf8",
      (err) => {
        // Checking for errors
        if (err) throw err;

        res.send(jsonData).status(200);
      }
    );
  } catch (err) {
    console.log(err);
  }
};
// update  food item to the json
const updateFoodItem = async (req, res) => {
  try {
    let jsonData = JSON.parse(fs.readFileSync("./data/items.json", "utf-8"));
    const data = req.body;
    jsonData.items.forEach((item) => {
      if (item.label === "food") {
        item.items.map((foodItem) => {
          if (foodItem.label === data.foodLabel) {
            foodItem.items.map((item) => {
              if (item.label === data.label) {
                item.price = data.price;
              }
            });
          }
        });
      }
    });

    fs.writeFile(
      "./data/items.json",
      JSON.stringify(jsonData),
      "utf8",
      (err) => {
        // Checking for errors
        if (err) throw err;

        res.send(jsonData);
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addFood,
  deleteFoodItem,
  updateFoodItem,
};
