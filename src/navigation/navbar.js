import {useContext} from "react"
import {AuthContext} from "../utils/context/auth"
import {Link} from "react-router-dom"

import Logo from "../images/logo.svg"

export default function Navbar(props){
    const {user, logout} = useContext(AuthContext)

    return (
        <div className="navbar">
            <img className="logo-home" src={Logo}/>
            <div className="user-logout">
                <div className="nav-username">{user.username}</div>
                <Link to="/" onClick={logout}>logout</Link>
            </div>
        </div>
    )
    
}