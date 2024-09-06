import { useContext, useState } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import { useAuthContext } from '../hooks/useAuthContext'

function WorkoutForm(){
    const {dispatch}=useContext(WorkoutContext)
    const { user } = useAuthContext()

    const[title,setTitle]=useState('');
    const[load,setLoad]=useState('');
    const[reps,setReps]=useState('');
    const[error,setError]=useState(null);
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //if user is not logged in
        if (!user) {
          setError('You must be logged in')
          return
        }
    
        const workout = {title, load, reps}
        
        const response = await fetch('/api/workouts', {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${user.token}`
            
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
          setEmptyFields([])
          setError(null)
          setTitle('')
          setLoad('')
          setReps('')
          console.log('new workout added:', json)
          dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    
      }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="excersize-input">Excersize Title: </label>
                <input
                type="text" 
                id="excersize-input" 
                placeholder="Enter the Excersize" 
                onChange={(e)=>setTitle(e.target.value) } 
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label htmlFor="load-input">Excersize Load (in kg): </label>
                <input 
                type="number" 
                id="load-input" 
                placeholder="Enter the Load" 
                onChange={(e)=>setLoad(e.target.value) } 
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
                />

                <label htmlFor="reps-input">Excersize Reps: </label>
                <input 
                type="number" 
                id="reps-input" 
                placeholder="Enter the No. of Reps" 
                onChange={(e)=>setReps(e.target.value) } 
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
                />



                    <button>Add Workout</button>
                    {error && <div className="error">{error}</div>}
            </form>
        </>
    )
}
export default WorkoutForm;