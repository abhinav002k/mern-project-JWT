// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useContext, useState } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { useAuthContext } from '../hooks/useAuthContext'


import EditForm from "./EditForm";

function WorkoutDetails({ workout }) {
    const { dispatch } = useContext(WorkoutContext);
    const { user } = useAuthContext()

    const handleClick = async () => {
        //if user is not logged in
        if (!user) {
            setError('You must be logged in')
            return
          }


        const res = await fetch(`/api/workouts/${workout._id}`, {
            method: "DELETE",
            headers:{'Authorization':`Bearer ${user.token}`}
              
        });
        const json = await res.json();

        if (res.ok) {
            console.log(json);
            dispatch({ type: "DELETE_WORKOUT", payload: json });
        }
    };



    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
            <button className="material-symbols-outlined" onClick={() => setOpenModal(true)}>EDIT</button>
            <EditForm workout={workout} open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
}

export default WorkoutDetails;
