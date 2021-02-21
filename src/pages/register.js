import {useState, useContext} from "react"
import {gql, useMutation} from "@apollo/client"

import { useForm } from "../utils/custom-hooks"
import LoginNav from "../navigation/login-nav"
import {AuthContext} from "../utils/context/auth"
import "../styles/login.css"

const Register = (props) => {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
        }

        const { onChange, handleSubmit, values} = useForm(registerUser, {
            username: "",
            email: "",
            password: "",
            confirmPassword: "" 
        })

        const [addUser, {loading}] = useMutation(REGISTER_USER,{
            update(proxy, result){
                console.log(result.data.register)
                context.login(result.data.register)
                props.history.push("/home")
            },
            onError(err){
                setErrors(err.graphQLErrors[0].extensions.exception.errors)
                console.log(err.graphQLErrors[0].extensions.exception.errors)
            },
            variables: values
        })

        function registerUser() {
            addUser()
        }

    return(
        <div>
        <LoginNav />
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
                    type="password"
                    label="Password"
                    placeholder="password"
                    name="password"
                    value={values.password}
                    onChange={onChange}
                    />

                    <input 
                    className="input"
                    type="password"
                    label="Confirm Password"
                    placeholder="confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={onChange}
                    />
                    <button>Submit</button>
                </form>
                {Object.keys(errors).length > 0 ? 
                    <div className="ui error message">
                        <ul className="list">
                        {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    </div>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }`

export default Register