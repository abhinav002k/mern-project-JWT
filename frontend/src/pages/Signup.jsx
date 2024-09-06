import { useState } from "react"
import { useSignup } from "../hooks/useSignup"


const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()
    
        await signup(email,password)
        setEmail('')
        setPassword('')
      }

    return (
        <form className="signup" onSubmit={handleSubmit}>

            <h3>SignUp</h3>

            <label htmlFor="email">Email: </label>
            <input
                type="email"
                onChange={(evt) => setEmail(evt.target.value)}
                value={email}
                name="email"
                placeholder="Enter Your Email"
            />


            <label htmlFor="password">Password: </label>
            <input
                type="password"
                onChange={(evt) => setPassword(evt.target.value)}
                value={password}
                name="password"
                placeholder="Enter Your Password"
            />

            <button disabled={isLoading}>Signup</button>
            {error && <div className="error">{error}</div>}  
        </form>
    )
}
export default Signup