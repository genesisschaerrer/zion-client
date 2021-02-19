import {useState} from "react"

import "../styles/login.css"

const Register = () => {
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmPassword, setConfimPassword] = useState("")

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
        })

        const onChange = () => {
            console.log("hit on change")
        }

        const handleSubmit = () => {
            console.log(' hit handle submit')
        }
    return(
        <div className="register-container">
            <div className="register-form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="register-title">Register</div>
                    <input 
                    className="input"
                    type="text"
                    label="Username"
                    placeholder="unsername"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    />

                    <input 
                    className="input"
                    type="text"
                    label="Email"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    />

                    <input 
                    className="input"
                    type=""
                    label="Email"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={onChange}
                    />

                    <input 
                    className="input"
                    type="text"
                    label="Confirm Password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    />


                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register