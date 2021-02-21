import Logo from "../images/logo.svg"
import {Link} from "react-router-dom"

import "../styles/login.css"

export default function LoginNav (){

    return(
        <div className="login-nav">
            <Link to="/"><img src={Logo}/></Link> 
            <div className="nav-message">get your spot & hit the trails!</div>
        </div>
    )
}