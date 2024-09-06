require('dotenv').config()
const express=require('express');
const mongoose = require('mongoose');
//Models
const Workout = require("./models/workoutModel");
//Models
const app=express();

const cors=require('cors')


//Connect to db
mongoose.connect('mongodb://127.0.0.1:27017/workout');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


//routes
const workoutRoutes=require('./routes/workouts')
const userRoutes=require('./routes/users')
//routes

//parsing the body data using middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//parsing the body datau sing middleware


app.use(cors());


//middlwares
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);




app.listen(process.env.PORT, ()=>{
    console.log('listening on port',process.env.PORT);
})