const mongoose = require('mongoose');


const Model = async () => {
  let connect = await mongoose.connect("mongodb://localhost:27017/GoFoodMeern")
  if (!connect) console.log("Connection faild..")
  console.log("MongoDB is connected")

  const foodFetchData = await mongoose.connection.db.collection("Food_items");
  const foodCategory = await mongoose.connection.db.collection("Food_Category");

  const catData = await foodCategory.find({}).toArray()
  const data = await foodFetchData.find({}).toArray()

  global.food_Item = data;
  global.food_Category = catData;
};
Model()

module.exports = Model;

