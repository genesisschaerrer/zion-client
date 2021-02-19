import {useState} from "react"
import {Link} from "react-router-dom"

import "../styles/login.css"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return(
        <div className="login-container">
            <div className="login-form-container">
                <form className="form">
                    <div className="login-title">LOGIN</div>
                    <input 
                    className="input"
                    type="text"
                    placeholder="unsername"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />

                    <input
                    className="input"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />

                    <button className="submit-btn">Submit</button>
                </form>
                <div>Don't have a login?</div>
                <Link to="register">Register</Link>
            </div>
        </div>
    )
}

export default Login