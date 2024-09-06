import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        login(email, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>

            <h3>Login</h3>

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

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default Login