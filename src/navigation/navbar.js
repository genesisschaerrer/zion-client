import {useContext} from "react"
import {AuthContext} from "../utils/context/auth"
import {Link} from "react-router-dom"

import Logo from "../images/logo.svg"
import logoutIcon from "../images/icons/logout.svg"
import "../styles/home.css"

export default function Navbar(props){
    const {user, logout} = useContext(AuthContext)

    return (
        <div className="navbar">
            <img className="logo-home" src={Logo}/>
            <div className="user-logout">
                <div className="nav-username">{user.username}</div>
                <Link to="/"><img  className="logout-icon" style={{"width": "20px"}} onClick={logout} src={logoutIcon} /></Link>
                {/* <img style={{"width": "20px"}} onClick={logout} src={logoutIcon} /> */}
            </div>
        </div>
    )
    
}