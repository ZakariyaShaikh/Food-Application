const express = require('express');
const Router =express.Router();



Router.post("/foodData",(req,res)=>{
    try {
        res.send([global.food_Item,global.food_Category])
    } catch (error) {
        console.error(error.message);
        res.send('Error to get data from Database..');
    }
})


module.exports = Router;