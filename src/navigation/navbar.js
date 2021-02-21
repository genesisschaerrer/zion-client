import {useContext} from "react"
import {AuthContext} from "../utils/context/auth"
import {Link, Redirect} from "react-router-dom"

export default function Navbar(props){
    const {user, logout} = useContext(AuthContext)

    // if(user === null){
    //     <Redirect exact to="/" />
    // }

    return
        <div>
            <div>{user.username}</div>
            <Link to="/" onClick={logout}>logout</Link>
        </div>
    
}