import { useContext, useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";
import { useAuthContext } from '../hooks/useAuthContext'
const Home = () => {


    const{workouts,dispatch}=useContext(WorkoutContext)
    const { user } = useAuthContext()
    
    useEffect(() => {
      const fetchWorkouts = async () => {
        try {
          const res = await fetch('/api/workouts',{
            headers:{'Authorization':`Bearer ${user.token}`}
          });
          if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
          }
          const jsonRes = await res.json();
          dispatch({type:'SET_WORKOUTS',payload:jsonRes})
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      }; 
      if(user){
        fetchWorkouts();
      }
    }, [dispatch,user]);


    return (
      <div className="home">
        <div className="workouts">
        {workouts && workouts.map((workout) => (
          // <p key={workout._id}>{workout.title}</p>
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
        </div>
        <div className="workout-form">
          <WorkoutForm/>
        </div>
      </div>
    )
  }
  
  export default Home