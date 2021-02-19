import {useState} from "react"
import {gql, useMutation} from "@apollo/client"
// import gql from "graphql-tag"

import "../styles/login.css"
import { printIntrospectionSchema } from "graphql"

const Register = (props) => {
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmPassword, setConfimPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
        })

        const onChange = (e) => {
            console.log("hit on change")
            setValues({...values, [e.target.name]: e.target.value})
        }

        const [addUser, {loading}] = useMutation(REGISTER_USER,{
            update(proxy, result){
                console.log(result)
            },
            onError(err){
                setErrors(err.graphQLErrors[0].extensions.exception.errors)
                console.log(err.graphQLErrors[0].extensions.exception.errors)
            },
            variables: values
        })

        const handleSubmit = (e) => {
            console.log(' hit handle submit')
            e.preventDefault()
            addUser()
            props.history.push("/home")

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