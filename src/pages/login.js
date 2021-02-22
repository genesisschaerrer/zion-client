import {useState, useContext} from "react"
import {gql, useMutation} from "@apollo/client"
import {Link} from "react-router-dom"

import { useForm } from "../utils/custom-hooks"
import {AuthContext} from "../utils/context/auth"
import LoginNav from "../navigation/login-nav"
import "../styles/login.css"

const Login = (props) => {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const {onChange, handleSubmit, values} = useForm(loginUserCallback, {
        username: "",
        password: ""
    })


    const [loginUser, {loading}] = useMutation(LOGIN_USER,{
        update(proxy, result){
            // console.log(result.data.login)
            context.login(result.data.login)
            props.history.push("/home")
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            console.log(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser()
    }

    return(
        <div className="page-container">
            <LoginNav />
        <div className="login-container">
            <div className="login-form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="login-title">Login</div>
                    <input 
                    className="input"
                    type="text"
                    label="Username"
                    placeholder="username"
                    name="username"
                    value={values.username}
                    
                    onChange={onChange}
                    />

                    <input 
                    className="input"
                    type="password"
                    label="Password"
                    placeholder="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    />
                    <button className="login-btn">Login</button>
                </form>
                {Object.keys(errors).length > 0 ? 
                    <div className="errors">
                        <ul className="list">
                        {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                    :
                    null
                }

                <div className="register-msg">Dont have a login? <span><Link to="/register">Register</Link></span></div>
            </div>
        </div>
    </div>
    )
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

export default Login