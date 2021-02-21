import Logo from "../images/logo.svg"

import "../styles/login.css"

export default function LoginNav (){

    return(
        <div className="login-nav">
            <img src={Logo}/>
            <div className="nav-message">get your spot & hit the trails!</div>
        </div>
    )
}