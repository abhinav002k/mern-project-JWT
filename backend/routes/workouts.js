const express = require('express');
const router = express.Router();
//Models
const Workout = require("../models/workoutModel");
//Models

const {getWorkouts,getWorkout,createWorkout,deleteWorkout,updateWorkout} = require('../controllers/workoutController')

//authorization middleware
const requireAuth =require('../middleware/requireAuth')
//authorization middleware

//authorization middleware use
router.use(requireAuth)

//Get all workouts
router.get('/', getWorkouts)

//create a new workout to doc

router.post('/',createWorkout)

//GET A single workout details

router.get('/:id', getWorkout)

//Delete a single workout

router.delete('/:id',deleteWorkout)

//Update an single workout details

router.patch('/:id',updateWorkout)
module.exports = router;