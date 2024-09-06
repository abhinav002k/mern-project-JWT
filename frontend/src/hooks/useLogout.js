import { useAuthContext } from './useAuthContext'
import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from 'react';

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const{dispatch: dispatchWorkouts}=useContext(WorkoutContext)

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}