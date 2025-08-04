const express = require('express')
const app = express()
const Model= require('./db')


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json());

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/LoginUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes//MyOrder"));

app.get('/', async (req, res) => {
    res.send("Hello World..")
});


app.listen(4000, () => {
    console.log("Server is running on port 4000");
})